export const config = {
    filters: [
        {
            "label": "State Wise Performance",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categorypmshri where category_name in ('total_schools_having_library', 'total_schools_having_handwash_facility', 'total_schools_having_drinking_water_facility', 'total_schools_having_ramp_facility', 'total_schools_having_playground', 'total_schools_having_internet_facility')"
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
                            "map": "select t1.state_id, t1.state_id as level, t2.state_name, t1.category_name, sum(t3.sum) as total_schools, round(cast(sum(t1.sum) / sum(t3.sum) as numeric) * 100, 2) as percentage, t2.latitude, t2.longitude from datasets.pm_shri_pm_shri_category_state0categorypmshri as t1 join dimensions.state as t2 on t2.state_id = t1.state_id join datasets.pm_shri_total_schools_state as t3 on t3.state_id = t1.state_id where category_name in ('total_schools_having_library', 'total_schools_having_handwash_facility', 'total_schools_having_drinking_water_facility', 'total_schools_having_ramp_facility', 'total_schools_having_playground', 'total_schools_having_internet_facility') group by t1.state_id, t2.state_name, t1.category_name, t2.latitude, t2.longitude"
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
                "metricValueProp": "percentage",
                "groupByColumn": "level",
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
                        "bigNumber1": "select SUM(count) as total_states from datasets.pm_shri_started_state",
                        "bigNumber2": "select SUM(sum) as total_schools from datasets.pm_shri_total_schools_state",
                        "bigNumber3": "select sum(sum) as only_boys_schools from datasets.pm_shri_pm_shri_category_state0categorypmshri where category_name = 'only_boys_school'",
                        "bigNumber4": "select sum(sum) as only_girls_schools from datasets.pm_shri_pm_shri_category_state0categorypmshri where category_name = 'only_girls_school'",
                        "bigNumber5": "select sum(sum) as co_ed_schools from datasets.pm_shri_pm_shri_category_state0categorypmshri where category_name = 'co-ed_school'"
                    },
                    "level": "state"
                }
            }
        ],
        "options": {
            "bigNumber": {
                "title": ['Total states/UTs', 'Total schools', 'Only boys schools', 'Only girls schools', 'Co-ed schools'],
                "valueSuffix": ['', '', '', '', ''],
                "property": ['total_states', 'total_schools', 'only_boys_schools', 'only_girls_schools', 'co_ed_schools']
            }
        }
    }
}