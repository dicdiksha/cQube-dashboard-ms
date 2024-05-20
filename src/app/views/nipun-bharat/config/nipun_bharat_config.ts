export const config = {
    filters: [
        {
            "label": "Learning Sessions",
            "name": "Subject",
            "labelProp": "subject",
            "valueProp": "subject",
            "id": "subject",
            "query": "select distinct(subject) from datasets.nipun_bharat_totallearningsessions_grade0subject order by subject"
        },
        {
            "label": "Module-wide Status",
            "name": "Module",
            "labelProp": "module",
            "valueProp": "module",
            "id": "module",
            "query": "select m.module from dimensions.modulesnipun m order by m.module"
         },
         {
            "label": "Module-wide Status",
            "name": "Quarter",
            "labelProp": "quarter",
            "valueProp": "quarter",
            "id": "quarter",
            "query": "select q.quarter from dimensions.modulesnipunquarter q order by q.quarter"
         },
        {
            "label": "Detailed Status",
            "name": "Quarter",
            "labelProp": "quarter",
            "valueProp": "quarter",
            "id": "quarter",
            "query": "select q.quarter from dimensions.modulesnipunquarter q order by q.quarter"
         },
         
    ],
    
    module_wide_status: {
        "label": "Module-wide Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select s2.state_id,s2.latitude, s2.longitude,s2.state_name ,sum(tnm.sum) as total_modules, round(cast(avg(tnm.sum) as numeric), 2) * 100 as modules_completed,tnm.quarter as quarter from datasets.nipun_bharat_totalnoofmodules_bbyptg51gxhubgstibks tnm join datasets.nipun_bharat_entry_value_state  s on s.state_id = tnm.state_id join dimensions.state s2 on s2.state_id =s.state_id group by s2.state_name,s2.state_id,s2.latitude, s2.longitude,tnm.quarter,s2.state_id order by s2.state_id",
                     },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "downloadConfig": {
                "fileName": "Module-wide Status",
                "excludeColumns": ['indicator', 'tooltip', 'Latitude', 'Longitude']
            },
                "map":
                {
                "indicatorType": "percent",
                "indicator": "modules_completed",
                "metricFilterNeeded": true,
                "groupByColumn": "state_id",
                "legend": { "title": "Modules Completed" },
                "drillDownConfig": {
                    "enableDrillDown": true,
                    "allowedLevels": [0]
                },
                   "tooltipMetrics":
                        [
                            {
                                "valuePrefix": "State/UT Name: ",
                                "value": "state_name",
                                "valueSuffix": "\n"
                            },
                            {
                                "valuePrefix": "Quarter: ",
                                "value": "quarter",
                                "valueSuffix": "\n"
                            },
                            {
                                "valuePrefix": "Total Modules: ",
                                "value": "total_modules",
                                "valueSuffix": "\n"
                            },
                            {
                                "valuePrefix": "Modules Completed : ",
                                "value": "modules_completed",
                                "valueSuffix": "%\n"
                            }
                        ]
                }
            }
    },
    detailed_status: {
        "label": "Detailed Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "table": "select s.state_name,nbtbg.module,nbtbg.sub_module,nbtbg.quarter,case when nbtbg.sum = 1 then  'Yes' else 'No' end as status from datasets.nipun_bharat_totalnoofmodules_bbyptg51gxhubgstibks nbtbg join dimensions.state s on 	s.state_id = nbtbg.state_id group by s.state_name,nbtbg.sum,nbtbg.quarter,nbtbg.module,nbtbg.sub_module order by s.state_name",
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            }
        ],
        "options": {
            "table": {
                "groupByNeeded": true,
                "metricLabelProp": "state_name",
                "metricValueProp": "status",
                "columns": [
                    {
                        name: "Module",
                        property: "module",
                        class: "text-center"
                    },
                    {
                        name: "Sub Module",
                        property: "sub_module",
                        class: "text-center"
                    },
                    {
                        name: "state_name",
                        groupByNeeded: true,
                        property: "state_name",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "status",
                            values: [
                                {
                                    color: "#007000",
                                    value: 'yes'
                                },
                                {
                                    color: "#D2222D",
                                    value: 'no'
                                }
                            ]
                        },
                     }
                ],
                "sortByProperty": "state_name",
                "sortDirection": "asc"
        }
    }
},
    textbook_status:{
        "label": "Textbook Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "actions": {
                    "queries": {
                        //"barChart": "select textbook_name as textbook, round(cast(avg(sum) as numeric),2) as lo_covered from datasets.nipun_bharat_perc_los_covered_textbooknipun group by textbook order by textbook",
                        "barChart": "select concat(txtbk.textbook_name, '-', txtbk.grade) as textbook, round(cast(avg(los.sum) as numeric),2) as lo_covered from datasets.nipun_bharat_perc_los_covered_textbooknipun los join dimensions.textbooknipun txtbk on txtbk.textbook_id = los.textbook_id  group by textbook order by textbook"
                    },
                    "level": "state"
                }
            }
        ],
        "options": {
            "barChart": {
                "valueSuffix": "%",
                "isMultibar": true,
                "type": "horizontal",
                "yAxis": {
                    "limitCharacters": 40,
                    "title": "Textbooks"
                },
                "xAxis": {
                    "title": "%LO Covered",
                    "label": "textbook",
                    "value": "textbook",
                    "metrics": [
                        {
                            "label": "%LO Covered",
                            "value": "lo_covered"
                        },
                        
                    ]
                }
            }
        }
    },
    learning_sessions: {
        "label": "Learning Sessions",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "actions": {
                    "queries": {
                        "barChart": "select grade, sum(sum) as learning_sessions from datasets.nipun_bharat_totallearningsessions_grade0subject group by grade order by grade",
                    },
                    "level": "state"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "type": "horizontal",
                "yAxis": {
                    "title": "Grades"
                },
                "xAxis": {
                    "title": "Total No of Learning Sessions",
                    "label": "grade",
                    "value": "grade",
                    "metrics": [
                        {
                            "label": "Total No of Learning Sessions(App and Portal)",
                            "value": "learning_sessions"
                        },
                        
                    ]
                }
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
                    "bigNumber1": "select dm.metric_value as total_learning_sessions from dimensions.mainmetrics dm where  dm.program_id='nib' and dm.metric_name ='Total Learning Sessions' and dm.metric_type ='Key Metric'",
                    "bigNumber2": "select dm.metric_value as total_content from dimensions.mainmetrics dm where  dm.program_id='nib' and dm.metric_name ='Total Content' and dm.metric_type ='Key Metric'",
                  },
                "level": "state"
            }
        },
    ],
    "options": {
        "bigNumber": {
            "title": ['Total Learning Sessions','Total Content'],
            //"valueSuffix": ['L', ''],
            "valueSuffix": ['', ''],
            "property": ['total_learning_sessions','total_content']
      
        }
    }
},
nipun_bharat_metrics: {
        "filters": [
        {
            "name": "National",
            "labelProp": "state_name",
            "valueProp": "state_id",
            "hierarchyLevel": "0",
            "actions": {
                "queries": {
                    "bigNumber1": "select sum(sum) as total_los_covered from datasets.nipun_bharat_los_covered_textbooknipun",
                    "bigNumber2": "select count(*) as total_digital_books from dimensions.textbooknipun",
                    "bigNumber3": "select dm.metric_value as total_content from dimensions.mainmetrics dm where  dm.program_id='nib' and dm.metric_name ='Total Content' and dm.metric_type ='Vanity Metric'",
                    "bigNumber4": "select dm.metric_value as total_learning_sessions from dimensions.mainmetrics dm where  dm.program_id='nib' and dm.metric_name ='Total Learning Sessions' and dm.metric_type ='Vanity Metric'",
                    },
                "level": "state"
            }
        },
    ],
    "options": {
        "bigNumber": {
            "title": ['Total Learning Outcomes (LOs) Covered','Total Digital Books','Total Content','Total Learning Sessions' ],
            //"valueSuffix": ['', '','','L'],
            "valueSuffix": ['', '','',''],
            "property": ['total_los_covered','total_digital_books','total_content','total_learning_sessions']
        }
    }
}
}