export const config = {
    filters: [
        {
            "label": "State Wise Performance",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categorypmshri where category_name not in ('total_instructional_classrooms')"
        }
    ],
    implementation_status: {
        "label": "Implementation Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select d.latitude, d.longitude, t.state_id, state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.pm_shri_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
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
                    "title": "Implemented PM SHRI"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Implemented PM SHRI: ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    state_wise_performance: {
        "label": "State Wise Performance",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map": "select t1.state_id, t2.state_name, t1.category_name, SUM(t4.sum) as total_girls_in_schools, SUM(t5.sum) as total_boys_in_schools, SUM(t6.sum) as total_instructional_classrooms, sum(t1.sum) as category_value, sum(t3.sum) as total_schools, round(cast(sum(t1.sum) / sum(t3.sum) as numeric) * 100, 2) as percentage, t2.latitude, t2.longitude from datasets.pm_shri_pm_shri_category_state0categorypmshri as t1 join dimensions.state as t2 on t2.state_id = t1.state_id join datasets.pm_shri_total_schools_state as t3 on t3.state_id = t1.state_id join datasets.pm_shri_total_boys_in_schools_state as t4 on t4.state_id = t1.state_id join datasets.pm_shri_total_girls_in_schools_state as t5 on t5.state_id = t1.state_id join datasets.pm_shri_total_instructional_classrooms_state as t6 on t6.state_id = t1.state_id where category_name not in ('total_instructional_classrooms') group by t1.state_id, t2.state_name, t1.category_name, t2.latitude, t2.longitude"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                }
            ],
        "options":
        {
            "downloadConfig": {
                "fileName": "State Wise Performance",
                "excludeColumns": ['indicator', 'tooltip', 'category_name', 'level', 'percentage', 'Latitude', 'Longitude']
            },
            "map":
            {
                "indicatorType": "percent",
                "metricLabelProp": "category_name",
                "metricValueProp": "category_value",
                "indicator": "percentage",
                "groupByColumn": "state_id",
                "metricFilterNeeded": true,
                "legend": { "title": "State Wise Performance" },
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
                        "valuePrefix": "Total schools: ",
                        "value": "total_schools",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total Boys in schools: ",
                        "value": "total_boys_in_schools",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total Girls in schools: ",
                        "value": "total_girls_in_schools",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Total Instructional classrooms: ",
                        "value": "total_instructional_classrooms",
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
    pmShri_metrics: {
        "label": "District Wise Performance",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "6448",
                        "bigNumber2": "763",
                        "bigNumber3": "863",
                        "bigNumber4": "1533",
                        "bigNumber5": "1384",
                        "bigNumber6": "1616",
                        "bigNumber7": "735",
                        "bigNumber8": "317"
                    },
                    "level": "state"
                }
            }
        ],
        "options": {
            "bigNumber": {
                "title": ['Total PM SHRI schools', 'Total districts', 'No. of primary schools', 'No. of upper primary schools', 'No. of secondary schools', 'No. of higher secondary schools', 'KVS', 'NVS'],
                "formatter": { locale: 'en-IN', format: "long" }
            }
        }
    }
}