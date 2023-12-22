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
            "label": "District Wise Performance",
            "name": "State",
            "labelProp": "state_name",
            "valueProp": "state_id",
            "id": "state_name",
            "query": "select state_id,state_name from dimensions.state order by state_name"
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
                        "map": "select d.latitude, d.longitude, t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.pgi_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "downloadConfig": {
                "fileName": "Implementation Status",
                "includeColumns": ['latitude', 'longitude', 'state_id', 'state_name', 'status']
            },
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
                        "map": "select t2.district_name, t1.district_id ,latitude, longitude, t1.category_name,round(cast(sum(t1.sum) as numeric ),2) as performance from datasets.pgi_category_district0categorypgi as t1 join dimensions.district as t2 on t2.district_id = t1.district_id group by t1.district_id, t2.district_name,t1.category_name, latitude, longitude order by t1.category_name"
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
                        "map": "select category_name, d.district_name,latitude, longitude,t.district_id, cast(sum(t.sum) as numeric) as performance FROM datasets.pgi_category_district0categorypgi as t join dimensions.district as d on t.district_id = d.district_id group by t.district_id, d.district_name, category_name, latitude, longitude order by category_name"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            },
            
        ],
        "options": {
            "downloadConfig": {
                "fileName": "District Wise Performance",
                "excludeColumns": ['performance', 'level', 'category_name', 'performance', 'indicator', 'tooltip', 'Latitude', 'Longitude']
            },
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "performance",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District-wise Performance " },
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
    summary_metrics: {
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": `select count(state_id) as total_state from datasets.pgi_started_state`,
                        //hardcoded value '70' is written for second main metrics 'Total parameters', as raw data file does not have total parameters list
                        "bigNumber2": "select dm.metric_value as total_parameters from datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Total Parameters' and dm.metric_type ='Key Metric'"
                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total States/UTs', 'Total Parameters'],
                "valueSuffix": ['', ''],
                "property": ['total_state', 'total_parameters']
            }
        }
    },
    pgi_metrics: {
        "label": "Progress Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "select dm.metric_value as outcome from datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Learning Outcomes & Quality' and dm.metric_type ='Vanity Metric'",
                        "bigNumber2": "select dm.metric_value as access from datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Access' and dm.metric_type ='Vanity Metric'",
                        "bigNumber3": "select dm.metric_value as infra_score from datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Infastructure & Facilities' and dm.metric_type ='Vanity Metric'",
                        "bigNumber4": "select dm.metric_value as equity from  datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Equity' and dm.metric_type ='Vanity Metric'",
                        "bigNumber5": "select dm.metric_value as governance_processes from datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Governance Processes' and dm.metric_type ='Vanity Metric'",
                     },
                    "level": "state"
                }
            },
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select dm.metric_value as outcome from datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Learning Outcomes & Quality' and dm.metric_type ='Vanity Metric'",
                        "bigNumber2": "select dm.metric_value as access from datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Access' and dm.metric_type ='Vanity Metric'",
                        "bigNumber3": "select dm.metric_value as infra_score from datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Infastructure & Facilities' and dm.metric_type ='Vanity Metric'",
                        "bigNumber4": "select dm.metric_value as equity from  datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Equity' and dm.metric_type ='Vanity Metric'",
                        "bigNumber5": "select dm.metric_value as governance_processes from datasets.dashboard_mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Governance Processes' and dm.metric_type ='Vanity Metric'",
                      },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Learning Outcomes & Quality', 'Access','Infrastructure & Facilities', 'Equity', 'Governance Processes' ],
                "property": ['outcome','access', 'infra_score','equity', 'governance_processes'],
                "valueSuffix": ['/180', '/80', '/150', '/230', '/360']
              
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
                        "map": "SELECT s.latitude, s.longitude, s.state_name, s.state_id, s.state_id as level, c.category_name, sum(c.sum) as performance FROM dimensions.state s JOIN datasets.pgi_category_state0categorypgi c ON s.state_id = c.state_id GROUP BY s.state_id,s.state_name, c.category_name, s.latitude, s.longitude  order by c.category_name"
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
                        "map": "select category_name, d.district_name,latitude, longitude,t.district_id, t.district_id as level, cast(sum(t.sum) as numeric) as performance FROM datasets.pgi_category_district0categorypgi as t join dimensions.district as d on t.district_id = d.district_id where d.state_id = {state_id} group by t.district_id, d.district_name, category_name, latitude, longitude order by category_name"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            },
        ],
        "options": {
            "downloadConfig": {
                "fileName": "State Wise Performance",
                "excludeColumns": ['performance', 'level', 'category_name', 'performance', 'indicator', 'tooltip', 'Latitude', 'Longitude']
            },
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "performance",
                "groupByColumn": "level",
                "metricFilterNeeded": true,
                "legend": { "title": "State-wise Performance " },
                "drillDownConfig": {
                    "enableDrillDown": true,
                    "allowedLevels": [0]
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/UT name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
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
    }
}