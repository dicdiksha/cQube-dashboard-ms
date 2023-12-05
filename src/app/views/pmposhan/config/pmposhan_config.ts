export const config = {
    filters: [
        {
            "label": "State Wise Progress Status",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categorypm"
        },
        {
            "label": "District Wise Progress Status",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categorypm"
        },
        {
            "label": "District Wise Progress Status",
            "name": "State",
            "labelProp": "state_name",
            "valueProp": "state_id",
            "id": "state_name",
            "query": "select state_id,state_name from dimensions.state order by state_name"
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
                        "map": "select d.latitude, d.longitude, t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.pm_poshan_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "downloadConfig": {
                "fileName": "Implementation Status",
                "excludeColumns": ['indicator', 'tooltip', 'Latitude', 'Longitude']
            },
            "map": {
                "metricFilterNeeded": false,
                "indicator": "status",
                "legend": {
                    "title": "States Onboarded on PM Poshan"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Onboarded on PM Poshan: ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    state_wise_progress_status: {
        "label": "State Wise Progress Status",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions": {
                        "queries":
                        {
                            "map": "select latitude, longitude, category_name as category_name, t2.state_name, t1.state_id, cast(sum(t1.sum) as numeric) as total_count FROM datasets.pm_poshan_category_daily_state0categorypm as t1 join dimensions.state as t2 on t1.state_id = t2.state_id group by t1.state_id,t2.state_name, category_name, latitude, longitude"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                }
            ],
        "options":
        {
            "downloadConfig": {
                "fileName": "State Wise Progress Status",
                "excludeColumns": ['indicator', 'total_count', 'category_name', 'tooltip', 'Latitude', 'Longitude']
            },
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "total_count",
                "groupByColumn": "state_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District Wise Progress Status" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/UT Name: ",
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
    },
    district_wise_progress_status:{
        "label": "District Wise Progress Status",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions": {
                        "queries":
                        {
                            "map": "select latitude, longitude, category_name as category_name,t2.district_name,t1.district_id, cast(sum(t1.sum) as numeric) as total_count FROM datasets.pm_poshan_category_daily_district0categorypm as t1 join dimensions.district as t2 on t1.district_id = t2.district_id group by t1.district_id,t2.district_name, category_name, latitude, longitude"
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
                            "map": "select latitude, longitude, category_name as category_name,t2.district_name,t1.district_id, cast(sum(t1.sum) as numeric) as total_count FROM datasets.pm_poshan_category_district0categorypm as t1 join dimensions.district as t2 on t1.district_id = t2.district_id group by t1.district_id,t2.district_name, category_name, latitude, longitude"
                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options":
        {
            "downloadConfig": {
                "fileName": "District Wise Progress Status",
                "excludeColumns": ['indicator', 'total_count', 'category_name', 'tooltip', 'Latitude', 'Longitude']
            },
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "total_count",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District Wise Progress Status" },
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
    pmposhan_metrics: {
        "label": "District Wise Progress Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "select sum(sum) as total_schools from datasets.pm_poshan_category_value_daily_categorypm where category_name = 'total_schools'",
                        "bigNumber2": "select sum(sum) as total_meals_served from datasets.pm_poshan_total_meals_served_daily_district",
                        "bigNumber3": "",
                        "bigNumber4": "select count(distinct state_id) as total_states from datasets.pm_poshan_started_state where sum > 0",
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
                        "bigNumber1": "select sum(sum) as total_schools from datasets.pm_poshan_category_value_categorypm where category_name = 'total_schools'",
                        "bigNumber2": "select sum(sum) as total_meals_served from datasets.pm_poshan_total_meals_served_daily_district",
                        "bigNumber3": "select count(distinct(district_id)) as total_districts from datasets.pm_poshan_total_meals_served_daily_district",
                        "bigNumber4": "",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Schools','Total Meals Served','Total Districts','Total States/UTs Participating'],
                "valueSuffix": ['','','',''],
                "property": ['total_schools','total_meals_served','total_districts','total_states']
            }
        }
    }
}
