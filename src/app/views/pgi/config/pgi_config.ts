export const config = {
    filters: [
        {
            "label": "District Wise Performance",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categorypgi"
        },
        {
            "label": "State Wise Performance",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categorypgi"
        },
    ],
    implementation_status:{
        "label": "Implementation Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.pgi_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "map": {
                "metricFilterNeeded": false,
                "indicator": "status",
                "legend": {
                    "title": "Implemented PGI"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Implemented PGI: ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    district_wise_performance: {
        "label": "District Wise Performance",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions":
                {
                    "queries":
                    {
                        "map": "select t2.district_name, t1.district_id ,latitude, longitude, t1.category_name,round(cast(sum(t1.sum) as numeric ),2) as performance from datasets.pgi_category_state0district0categorypgi as t1 join dimensions.district as t2 on t2.district_id = t1.district_id group by t1.district_id, t2.district_name,t1.category_name, latitude, longitude"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries":
                    {
                        "map": "select category_name, d.district_name,latitude, longitude,t.district_id, cast(sum(t.sum) as numeric) as performance FROM datasets.pgi_category_state0district0categorypgi as t join dimensions.district as d on t.district_id = d.district_id group by t.district_id, d.district_name, category_name, latitude, longitude"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            },
            
        ],
        "options": {
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "performance",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District-wise Performance" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    pgi_metrics: {
        "label": "Progress Status",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select sum(sum) as outcome from datasets.pgi_category_value_performancecategorypgi as t where category_name = 'learningoutcomes_and_quality'",
                        "bigNumber2": "select sum(sum) as infra_score from datasets.pgi_category_value_performancecategorypgi as t where category_name = 'infrastructure_and_facilities'",
                        "bigNumber3": "select sum(sum) as governance_processes from datasets.pgi_category_value_performancecategorypgi as t where category_name = 'governance_processes'",
                        "bigNumber4": "",
                        "bigNumber5": ""
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Learning Outcomes & Quality', 'Infrastructure & Facilities', 'Governance Processes', 'Access', 'Equity',],
                "valueSuffix": ['', '', '', '', ''],
                "property": ['outcome', 'infra_score', 'governance_processes', '', '']
            }
        }
    },
    state_wise_performance:{
        "label": "State Wise Performance",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries":
                    {
                        "map": "SELECT s.latitude, s.longitude, s.state_name, s.state_id, c.category_name, sum(c.sum) as performance FROM dimensions.state s JOIN datasets.pgi_category_state0categorypgi c ON s.state_id = c.state_id GROUP BY s.state_id,s.state_name, c.category_name, s.latitude, s.longitude"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "performance",
                "groupByColumn": "state_id",
                "metricFilterNeeded": true,
                "legend": { "title": "State-wise Performance" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/UT name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    }
}