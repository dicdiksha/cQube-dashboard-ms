export const config = {
    filters: [
        {
            "label": "ETB Coverage Status",
            "name": "Medium",
            "id": "medium",
            "labelProp": "medium",
            "valueProp": "medium",
            "query": "select medium from dimensions.medium ORDER BY id ASC "
        },
        {
            "label": "Content Coverage on QR",
            "name": "Medium",
            "id": "medium",
            "labelProp": "medium",
            "valueProp": "medium",
            "query": "select medium from dimensions.medium ORDER BY id ASC "
        },
        {
            "label": "Learning Sessions",
            "name": "Medium",
            "labelProp": "medium",
            "valueProp": "medium",
            "id": "medium",
            "query": "select distinct(medium) from datasets.diksha_totalplays_state0grade0subject0medium order by medium"
        },
        {
            "label": "Learning Sessions",
            "name": "Grade",
            "labelProp": "grade",
            "valueProp": "grade",
            "id": "grade",
            "query": "select distinct(grade) from datasets.diksha_totalplays_state0grade0subject0medium order by grade"
        },
        {
            "label": "Learning Sessions",
            "name": "Subject",
            "labelProp": "subject",
            "valueProp": "subject",
            "id": "subject",
            "query": "select distinct(subject) from datasets.diksha_totalplays_state0grade0subject0medium order by subject"
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
                        "map": "select d.latitude, d.longitude, t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.diksha_energized_textbooks_state) as t on  d.state_id = t.state_id order by d.state_name asc"
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
                    "title": "Textbooks Energized"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Textbooks Energized: ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    etb_coverage_status_bignumber: {
        "label": "ETB Coverage Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber": "select round(cast(avg(sum) as numeric),2) as total_coverage from datasets.diksha_perc_energized_textbooks_state"
                    },
                    "level": "State",
                    "nextLevel": "District"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": "Overall ETB Coverage",
                "valueSuffix": "%",
                "property": "total_coverage"
            }
        }
    },

    etb_coverage_status: {
        "label": "ETB Coverage Status",
        "filters": [{
            "name": "State",
            "hierarchyLevel": "1",
            "actions": {
                "queries": {
                    "table": "select subject as subject , grade as class , round(cast(sum(sum) as numeric),2) as performance from datasets.diksha_linkedqrcount_textbookdiksha0grade0subject0medium as t1 group by subject ,grade "
                },
                "level": "District",
                "nextLevel": "Block"
            }
        }],
        "options": {
            "table": {
                "groupByNeeded": true,
                "metricLabelProp": "class",
                "metricValueProp": "performance",
                "fillEmptyCell": "N/A",
                "columns": [

                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Class",
                        groupByNeeded: true,
                        property: "class",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#007000",
                                    breakPoint: 70
                                },
                                {
                                    color: "#FFBF00",
                                    breakPoint: 40
                                },
                                {
                                    color: "#D2222D",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "subject",
                "sortDirection": "asc"
            }
        }
    },

    etb_coverage_status_nvsk: {
        "label": "ETB Coverage Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "table": "select s.state_name, sum(t1.sum) as total_curriculum_txbs, sum(t2.sum) as total_energized_txbs, round(cast(avg(t3.sum) as numeric), 2) as perc_energized from datasets.diksha_total_curriculum_textbooks_state as t1 join datasets.diksha_total_energized_textbooks_state as t2 on t1.state_id = t2.state_id join datasets.diksha_perc_energized_textbooks_state as t3 on t1.state_id = t3.state_id join dimensions.state as s on t1.state_id = s.state_id group by t1.state_id, s.state_name order by s.state_name"
                    },
                    "level": "District",
                    "nextLevel": "Block"
                }
            },
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "State/UT Name",
                        property: "state_name",
                        class: "text-center"
                    },
                    {
                        name: "Total Curriculum Textbooks",
                        property: "total_curriculum_txbs",
                        class: "text-center"
                    },
                    {
                        name: "Total Energized Textbooks",
                        property: "total_energized_txbs",
                        class: "text-center"
                    },
                    {
                        name: "% Energized Textbooks",
                        property: "perc_energized",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#007000",
                                    breakPoint: 70
                                },
                                {
                                    color: "#FFBF00",
                                    breakPoint: 40
                                },
                                {
                                    color: "#D2222D",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortDirection": "asc"
            }
        }
    },

    content_coverage_bignumber:
    {
        "label": "Content Coverage on QR",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber": " select round(cast(avg(sum) as numeric),2) as content_coverage from datasets.diksha_content_coverage_on_qr_state  "
                    },
                    "level": "State",
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": " select round(cast(avg(sum) as numeric),2) as content_coverage from datasets.diksha_qrcoverage_textbookdiksha0grade0subject0medium "
                    },
                    "level": "District",
                    "nextLevel": "Block"
                }
            }
        ],
        "options": {
            "bigNumber": {
                "title": "Content Coverage on QR",
                "valueSuffix": "%",
                "property": "content_coverage"
            }
        }
    },

    content_coverage: {
        "label": "Content Coverage on QR",
        "filters": [{
            "name": "State",
            "hierarchyLevel": "1",
            "actions": {
                "queries": {
                    "table": "select subject as subject , grade as class , round(cast(avg(sum) as numeric),2) as performance from datasets.diksha_contentqrcode_textbookdiksha0grade0subject0medium as t1 group by subject ,grade "
                },
                "level": "District",
                "nextLevel": "Block"
            }
        }],
        "options": {
            "table": {
                "groupByNeeded": true,
                "metricLabelProp": "class",
                "metricValueProp": "performance",
                "fillEmptyCell": "N/A",
                "columns": [

                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Class",
                        groupByNeeded: true,
                        property: "class",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#007000",
                                    breakPoint: 70
                                },
                                {
                                    color: "#FFBF00",
                                    breakPoint: 40
                                },
                                {
                                    color: "#D2222D",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "subject",
                "sortDirection": "asc"
            }
        }
    },

    content_coverage_bar: {
        "label": "Content Coverage on QR",
        "filters": [{
            "name": "National",
            "hierarchyLevel": "0",
            "actions": {
                "queries": {
                    "barChart": "select s.state_name, round(cast(avg(t.sum) as numeric),2) as content_coverage from datasets.diksha_content_coverage_on_qr_state as t join dimensions.state as s on t.state_id = s.state_id group by t.state_id, s.state_name order by s.state_name"
                },
                "level": "State"
            }
        }],
        "options": {
            "barChart": {
                "valueSuffix": "%",
                "isMultibar": true,
                "type": "horizontal",
                "yAxis": {
                    "title": "States"
                },
                "xAxis": {
                    "title": "Content Coverage on QR",
                    "label": "state_name",
                    "value": "state_name",
                    "metrics": [
                        {
                            "label": "Content Coverage on QR",
                            "value": "content_coverage"
                        },

                    ]
                }
            }
        }
    },

    content_coverage_map: {
        "label": "Content Coverage on QR",
        "filters": [{
            "name": "National",
            "hierarchyLevel": "0",
            "actions": {
                "queries": {
                    "map": "select latitude, longitude, s.state_name, round(cast(avg(t.sum) as numeric),2) as content_coverage from datasets.diksha_content_coverage_on_qr_state as t join dimensions.state as s on t.state_id = s.state_id group by t.state_id, s.state_name, latitude, longitude order by s.state_name"
                },
                "level": "State",
            }
        }],
        "options": {
            "map": {
                "indicatorType": "percent",
                "metricFilterNeeded": false,
                "indicator": "content_coverage",
                "legend": {
                    "title": "Content Coverage on QR"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Content Coverage on QR: ",
                        "value": "content_coverage",
                        "valueSuffix": "%\n"
                    }
                ]
            }
        }
    },

    learning_sessions: {
        "label": "Learning Sessions",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "barChart": "select state_name, sum(sum) as learning_sessions from datasets.diksha_totalplays_state0grade0subject0medium as t join dimensions.state as s on t.state_id = s.state_id group by t.state_id, state_name order by state_name",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "type": "horizontal",
                "yAxis": {
                    "title": "States"
                },
                "xAxis": {
                    "title": "Total No of Learning Sessions",
                    "label": "state_name",
                    "value": "state_name",
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

    // learning_sessions_on_potential_users: {
    //     "label": "Learning Sessions on Potential Users",
    //     "filters": [
    //         {
    //             "name": "State",
    //             "hierarchyLevel": "1",
    //             "actions": {
    //                 "queries": {
    //                     "map": "select t2.state_name  ,sum(t1.sum) as users, latitude, longitude from datasets.diksha_plays_per_capita_state as t1 join dimensions.state as t2 on t1.state_id = t2.state_id group by t2.state_name, latitude, longitude"
    //                 },
    //                 "level": "district",
    //                 "nextLevel": "block"
    //             }
    //         }
    //     ],
    //     "options": {
    //         "map": {
    //             "metricFilterNeeded": false,
    //             "indicator": "users",
    //             "legend": {
    //                 "title": "Learning Sessions on Potential Users"
    //             },
    //             "tooltipMetrics": [
    //                 {
    //                     "valuePrefix": "State/ UT Name",
    //                     "value": "state_name",
    //                     "valueSuffix": "\n"
    //                 },
    //                 {
    //                     "valuePrefix": "Learning Sessions on Potential Users",
    //                     "value": "users",
    //                     "valueSuffix": "\n"
    //                 }
    //             ]
    //         }
    //     }
    // },

    learning_sessions_on_potential_users: {
        "label": "Learning Sessions on Potential Users",
        "filters": [
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber": "select sum(t1.sum) as users from datasets.diksha_plays_per_capita_state as t1 join dimensions.state as t2 on t1.state_id = t2.state_id"
                    },
                    "level": "district"
                }
            },
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select latitude, longitude, t2.state_name, round(cast(sum(t1.sum) as numeric),2) as users from datasets.diksha_learning_session_on_potential_user_state as t1 join dimensions.state as t2 on t1.state_id = t2.state_id group by t1.state_id, t2.state_name, latitude, longitude"
                    },
                    "level": "State",
                }
            }
        ],
        "options": {
            "bigNumber": {
                "title": "Learning Sessions On Potential Users",
                "valueSuffix": '',
                "property": 'users'
            },
            "map": {
                "metricFilterNeeded": false,
                "indicator": "users",
                "legend": {
                    "title": "Learning Sessions on Potential Users"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Learning Sessions on Potential Users: ",
                        "value": "users",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    diksha_metrics: {
        "label": "ETB Coverage Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "6766",
                        "bigNumber2": "107000",
                        "bigNumber3": "332000",
                        "bigNumber4": "select count(distinct state_id) as total_states from datasets.diksha_energized_textbooks_state where sum > 0"
                    },
                    "level": "district"
                }
            },
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select sum(sum) as total_etbs from datasets.diksha_resourcecount_textbookdiksha0grade0subject0medium",
                        "bigNumber2": "select sum(sum) as total_qr_codes from datasets.diksha_totalqrcodes_textbookdiksha0grade0subject0medium",
                        "bigNumber3": "select round(cast(avg(sum) as numeric),2) as content_coverage from datasets.diksha_qrcoverage_textbookdiksha0grade0subject0medium",
                        "bigNumber4": ""
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": [{
                "title": ['Total ETBs', 'Total QR Codes', 'Total Content', 'Total States/UTs Participating'],
                "valueSuffix": ['', '', '', ''],
                "property": ['', '', '', 'total_states'],
                "formatter": { locale: 'en-IN', format: "long" }
            }, {
                "title": ['Total ETBs', 'Total QR Codes', 'Content Coverage on QR', 'Total States/UTs Participating', 'Total Content'],
                "valueSuffix": ['', '', '%', '', ''],
                "property": ['total_etbs', 'total_qr_codes', 'content_coverage', 'total_states', '']
            }]
        }
    }



}