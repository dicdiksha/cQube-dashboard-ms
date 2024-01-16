export const config = {
    filters: [
        {
            "label": "Improvements Status",
            "name": "Metric",
            "id": "metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "query": "SELECT category_name FROM dimensions.categorymicro ORDER BY id ASC "
        },
    ],
    implementation_status: {
        "label": "Implementation Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select d.latitude, d.longitude, t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.micro_improvements_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
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
                    "title": "Started Doing Micro-Improvement"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name :",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Participating in Micro-Improvement Program :",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    improvements_status: {
        "label": "Improvements Status",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map":"select t2.latitude, t2.longitude, t.state_id,state_name,category_name,sum(sum) as performance from datasets.micro_improvements_categorymicro_state0categorymicro as t join dimensions.state as t2 on t.state_id=t2.state_id group by t.state_id,state_name,category_name, t2.latitude, t2.longitude"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                },
                
            ],
            "options":
            {
                "downloadConfig": {
                    "fileName": "Improvements Status",
                    "excludeColumns": ['indicator', 'category_name', 'performance', 'tooltip', 'Latitude', 'Longitude']
                },
                "map":
                {
                    "indicatorType": "",
                    "metricLabelProp": "category_name",
                    "metricValueProp": "performance",
                    "groupByColumn": "state_id",
                    "metricFilterNeeded": true,
                    "legend": { "title": "Total Micro Improvements" },
                    "tooltipMetrics": [
                        {
                            "valuePrefix": "State Name: ",
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
    summary_metrics: {
        "filters": [
        {
            "name": "National",
            "hierarchyLevel": "0",
            "actions": {
                "queries": {
                    // "bigNumber1": "select sum(sum) as total_states_uts from datasets.micro_improvements_started_state",
                    "bigNumber1": "select dm.metric_value as total_states_uts from dimensions.mainmetrics dm where  dm.program_id='mip' and dm.metric_name ='Total States/UTs Participating' and dm.metric_type ='Key Metric'",
                    // "bigNumber2": "select sum(sum) as total_mi_ongoing from datasets.micro_improvements_categorymicro_state0categorymicro where category_name = 'total_microimprovement_projects'",
                    "bigNumber2": "select dm.metric_value as total_mi_ongoing from dimensions.mainmetrics dm where  dm.program_id='mip' and dm.metric_name ='Total Micro-Improvement Projects' and dm.metric_type ='Key Metric'",
                },
                "level": "state"
            }
        },
    ],
    "options": {
        "bigNumber": {
            "title": ['Total States/UTs Participating','Total Micro-Improvement Projects'],
            "valueSuffix": ['',''],
            "property": ['total_states_uts','total_mi_ongoing']
      
        }
    }
},
    micro_improvements_metrics: {
        "label": "Progress Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        // "bigNumber1": "select sum(sum) as total_mi_ongoing from datasets.micro_improvements_categorymicro_state0categorymicro where category_name = 'total_microimprovement_projects'",
                        // "bigNumber2": "select sum(sum) as total_mi_started from datasets.micro_improvements_categorymicro_state0categorymicro where category_name = 'total_microimprovement_started'",
                        // "bigNumber3": "select sum(sum) as total_mi_inprogress from datasets.micro_improvements_categorymicro_state0categorymicro where category_name = 'total_microimprovement_inprogress'",
                        // "bigNumber4": "select sum(sum) as total_mi_submitted from datasets.micro_improvements_categorymicro_state0categorymicro where category_name = 'total_microimprovement_submitted'",
                        // "bigNumber5": "select sum(sum) as total_mi_submitted_with_evidence from datasets.micro_improvements_categorymicro_state0categorymicro where category_name = 'total_microimprovement_submitted_with_evidence'",

                        "bigNumber1": "select dm.metric_value as total_mi_ongoing from dimensions.mainmetrics dm where  dm.program_id='mip' and dm.metric_name ='Total Micro Improvements Ongoing' and dm.metric_type ='Vanity Metric'",
                        "bigNumber2": "select dm.metric_value as total_mi_started from dimensions.mainmetrics dm where  dm.program_id='mip' and dm.metric_name ='Total Micro Improvements Started' and dm.metric_type ='Vanity Metric'",
                        "bigNumber3": "select dm.metric_value as total_mi_inprogress from dimensions.mainmetrics dm where  dm.program_id='mip' and dm.metric_name ='Total Micro Improvements In Progress' and dm.metric_type ='Vanity Metric'",
                        "bigNumber4": "select dm.metric_value as total_mi_submitted from dimensions.mainmetrics dm where  dm.program_id='mip' and dm.metric_name ='Total Micro Improvements Submitted' and dm.metric_type ='Vanity Metric'",
                        "bigNumber5": "select dm.metric_value as total_mi_submitted_with_evidence from dimensions.mainmetrics dm where  dm.program_id='mip' and dm.metric_name ='Total Micro Improvements Submitted with Evidence' and dm.metric_type ='Vanity Metric'",

                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Micro Improvements Ongoing', 'Total Micro Improvements Started', 'Total Micro Improvements In Progress', 'Total Micro Improvements Submitted', 'Total Micro Improvements Submitted with Evidence'],
                "valueSuffix": ['','','','',''],
                "property": ['total_mi_ongoing', 'total_mi_started', 'total_mi_inprogress', 'total_mi_submitted', 'total_mi_submitted_with_evidence']
            }
        }
    }
}

