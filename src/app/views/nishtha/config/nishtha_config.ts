export const config = {
    filters: [
        {
            "label": "District Wise Status",
            "name": "Program",
            "labelProp": "program_name",
            "valueProp": "program_name",
            "id": "program_name",
            "tableAlias": "t1",
            "query": "select program_name from dimensions.programnishtha order by program_name"
        },
        {
            "label": "Course Wise Status",
            "name": "Program",
            "labelProp": "program_name",
            "valueProp": "program_name",
            "id": "program_name",
            "tableAlias": "t1",
            "query": "select program_name from dimensions.programnishtha order by program_name"
        },
        // {
        //     "label": "Implementation Status",
        //     "name": "Program",
        //     "labelProp": "program_name",
        //     "valueProp": "program_name",
        //     "id": "metric",
        //     "query": "select program_name from dimensions.programnishtha order by program_name"
        // },
        {
            "label": "Courses and Medium Status",
            "name": "Program",
            "labelProp": "program_name",
            "valueProp": "program_name",
            "id": "program_name",
            "tableAlias": "ntc",
            "query": "select program_name from dimensions.programnishtha order by program_name"
        },
        // {
        //     "label": "% against Potential Base",
        //     "name": "Program",
        //     "labelProp": "program_name",
        //     "valueProp": "program_name",
        //     "id": "program_name",
        //     "tableAlias": "ntae",
        //     "query": "select program_name from dimensions.programnishtha order by program_name"
        // },
        // {
        //     "label": "District Wise Performance",
        //     "name": "Metric",
        //     "labelProp": "category_name",
        //     "valueProp": "category_name",
        //     "id": "metric",
        //     "query": "select category_name from dimensions.categorypgi"
        // },
        // {
        //     "label": "Medium of instruction",
        //     "name": "Program",
        //     "labelProp": "program_name",
        //     "valueProp": "program_name",
        //     "id": "program_name",
        //     "query": "select program_name from dimensions.programnishtha order by program_name"
        // },
    ],
    implementation_status: {
        "label": "Implementation Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select d.latitude, d.longitude, t.state_id, t.state_id as level, t.program_name, state_name ,t.status from dimensions.state as d join (select state_id, program_name, case when sum > 0 then 'YES' else 'NO' end as status from datasets.nishtha_programstarted_state0programnishtha) as t on  d.state_id = t.state_id order by d.state_name asc"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table": `select  CASE WHEN p.program_name LIKE 'NISHTHA_Elementary%' THEN 'NISHTHA Elementary'
                        ELSE p.program_name END AS program_name, 
                        case when p.sum > 0 then 'YES' else 'NO' end as status,
                        pstatus.program_status as program_status
                        from datasets.nishtha_started_programnishtha p join datasets.nishtha_programstarted_dwl6ewangb0rgg8igage pstatus
                        on p.program_name = pstatus.program_name
                        group by p.program_name, status, program_status order by p.program_name`,
                        //"map": "select d.latitude, d.longitude, t.district_id, t.district_id as level, t.program_name, district_name ,t.status from dimensions.district as d join (select district_id, program_name, case when sum > 0 then 'YES' else 'NO' end as status from datasets.nishtha_programstarted_district0programnishtha) as t on  d.district_id = t.district_id order by d.district_name asc"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Program Name",
                        property: "program_name",
                        class: "text-center"
                    },
                    {
                        name: "Nishtha Started",
                        property: "status",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "status",
                            values: [
                                {
                                    value: "yes",
                                    color: '#007000'
                                },
                                {
                                    value: "no",
                                    color: '#D2222D'
                                }
                            ]
                        }
                    },
                    {
                        name: "Implementation Mode",
                        property: "program_status",
                        class: "text-center"
                    }
                ],
            },
            "downloadConfig": {
                "fileName": "Implementation Status",
                "excludeColumns": ['indicator', 'tooltip', 'Latitude', 'Longitude', 'status']
            },
            // "map": {
            //     "metricLabelProp": "program_name",
            //     "metricValueProp": "status",
            //     "groupByColumn": "level",
            //     "metricFilterNeeded": true,
            //     "legend": {
            //         "title": "Implemented Nishtha"
            //     },
            //     "tooltipMetrics": [
            //         {
            //             "valuePrefix": "State/ UT Name: ",
            //             "value": "state_name",
            //             "valueSuffix": "\n"
            //         },
            //         {
            //             "valuePrefix": "District Name: ",
            //             "value": "district_name",
            //             "valueSuffix": "\n"
            //         },
            //         {
            //             "valuePrefix": "",
            //             "value": "program_name",
            //             "valueSuffix": "\n"
            //         }
            //     ]
            // }
        }
    },
    course_and_medium_status: {
        "label": "Courses and Medium Status",
        "filters": [
            // {
            //     "name": "National",
            //     "hierarchyLevel": "0",
            //     "actions": {
            //         "queries": {
            //             "table": "select st.state_id, st.state_name, ntc.sum as total_courses, ntm.sum as total_medium from datasets.nishtha_totalcourseslaunched_state0programnishtha as ntc JOIN datasets.nishtha_totalmedium_state0programnishtha as ntm ON ntc.state_id = ntm.state_id AND ntc.program_name = ntm.program_name JOIN dimensions.state as st ON st.state_id = ntc.state_id ORDER BY total_courses DESC"
            //         },
            //         "level": "district",
            //         "nextLevel": "block"
            //     }
            // },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table": "select t1.program_name , sum(t1.sum) as total_courses ,sum(t2.sum) as  total_medium from datasets.nishtha_total_courses_programnishtha as t1 join datasets.nishtha_total_medium_programnishtha as t2 on t1.program_name = t2.program_name group by t1.program_name"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Program Name",
                        property: "program_name",
                        class: "text-center"
                    },
                    {
                        name: "State Name",
                        property: "state_name",
                        class: "text-center"
                    },
                    {
                        name: "Total Courses Launched",
                        property: "total_courses",
                        class: "text-center"
                    },
                    {
                        name: "Total Mediums",
                        property: "total_medium",
                        class: "text-center"
                    }
                ],
            }
        }
    },
    medium_of_instruction: {
        "label": "Medium of instruction",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "table": "SELECT st.state_name, SUM(count) as no_of_languages, string_agg(language, ',' order by language) as list_of_languages FROM datasets.nishtha_totalmedium_dqamdiwbdiicaxv9f2xl as ntm JOIN dimensions.state as st ON st.state_id = ntm.state_id GROUP BY ntm.state_id, st.state_name ORDER BY st.state_name"
                    },
                    "level": "state"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "table": "SELECT program_name, SUM(count) as no_of_languages, string_agg(language, ',' order by language) as list_of_languages FROM datasets.nishtha_totalmedium_dqamdiwbdiicaxv9f2xl as ntm GROUP BY ntm.program_name ORDER BY ntm.program_name"
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Program name",
                        property: "program_name",
                        class: "text-center"
                    },
                    {
                        name: "No.of Languages",
                        property: "no_of_languages",
                        class: "text-center"
                    },
                    {
                        name: "List of Languages",
                        property: "list_of_languages",
                        class: "text-center"
                    }
                ],
            }
        }
    },
    potential_base: {
        "label": "% against Potential Base",
        "defaultLevel": "state",
        "filters": [
            // {
            //     "name": "National",
            //     "hierarchyLevel": "0",
            //     "actions": {
            //         "queries": {
            //             "stackedBarChart": "select st.state_id, st.state_name, ntae.sum as achieved_enrollments_per, (100 - ntae.sum) as expected_enrollments_per, nae.sum as actual_enrollments, nae.sum as expected_enrollments from datasets.nishtha_targetachievedenrolment_state0programnishtha as ntae JOIN datasets.nishtha_actualenrolment_state0programnishtha as nae ON nae.state_id = ntae.state_id AND nae.program_name = ntae.program_name JOIN datasets.nishtha_expectedenrolment_state0programnishtha as nee ON nee.state_id = ntae.state_id AND nee.program_name = ntae.program_name JOIN dimensions.state as st ON st.state_id = ntae.state_id ORDER BY st.state_name",
            //         },
            //         "level": "district"
            //     }
            // },
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select t1.program_name, round(cast(avg(t1.sum) as numeric),2) as target_achieved, round(cast(avg(t1.sum) as numeric) + (cast(avg(t2.sum) as numeric)),2) as total_target from datasets.nishtha_perc_target_achieved_enrolment_programnishtha as t1 join datasets.nishtha_perc_target_remaining_enrolment_programnishtha as t2 on t1.program_name = t2.program_name group by t1.program_name",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "yAxis": {
                    "title": ""
                },
                "xAxis": {
                    "title": " Programs",
                    "label": "program_name",
                    "value": "program_name",
                    "metrics": [
                        {
                            "label": "% Target Achieved-Enrolment",
                            "value": "target_achieved"
                        },
                        {
                            "label": "% Total Target-Enrolment",
                            "value": "total_target"
                        }
                    ]
                }
            },
            "stackedBarChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "yAxis": {
                    "title": "States",
                    "label": "state_name",
                    "value": "state_name",
                },
                "xAxis": {
                    "title": "",
                    "metrics": [
                        {
                            "label": "% Target Achieved-Enrolment",
                            "value": "achieved_enrollments_per"
                        },
                        {
                            "label": "% Total Target-Enrolment",
                            "value": "expected_enrollments_per"
                        }
                    ]
                }
            }
        }
    },
    potential_base_certificates: {
        "label": "% against Potential Base",
        "defaultLevel": "state",
        "filters": [
            // {
            //     "name": "National",
            //     "hierarchyLevel": "0",
            //     "actions": {
            //         "queries": {
            //             "stackedBarChart": "select st.state_id, st.state_name, ntae.sum as achieved_certificates_per, (100 - ntae.sum) as expected_certificates_per, nac.sum as actual_certificates, nac.sum as expected_certificates from datasets.nishtha_targetachievedcertificates_state0programnishtha as ntae JOIN datasets.nishtha_actualcertification_state0programnishtha as nac ON nac.state_id = ntae.state_id AND nac.program_name = ntae.program_name JOIN datasets.nishtha_expectedcertificates_state0programnishtha as nec ON nec.state_id = ntae.state_id AND nec.program_name = ntae.program_name JOIN dimensions.state as st ON st.state_id = ntae.state_id ORDER BY st.state_name;",
            //         },
            //         "level": "district"
            //     }
            // },
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select t1.program_name, round(cast(avg(t1.sum) as numeric),2) as target_achieved, round(cast(avg(t1.sum) as numeric) + (cast(avg(t2.sum) as numeric)),2) as total_target from datasets.nishtha_perc_target_achieved_certificates_programnishtha as t1 join datasets.nishtha_perc_target_remaining_certificates_programnishtha as t2 on t1.program_name = t2.program_name group by t1.program_name",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "yAxis": {
                    "title": ""
                },
                "xAxis": {
                    "title": " Programs",
                    "label": "program_name",
                    "value": "program_name",
                    "metrics": [
                        {
                            "label": "% Target Achieved-Certificates",
                            "value": "target_achieved"
                        },
                        {
                            "label": "% Total Target-Certificates",
                            "value": "total_target"
                        }
                    ]
                }
            },
            "stackedBarChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "yAxis": {
                    "title": "States",
                    "label": "state_name",
                    "value": "state_name",
                },
                "xAxis": {
                    "title": "",
                    "metrics": [
                        {
                            "label": "% Target Achieved-Certificates",
                            "value": "achieved_certificates_per"
                        },
                        {
                            "label": "% Total Target-Certificates",
                            "value": "expected_certificates_per"
                        }
                    ]
                }
            }
        }
    },
    potential_base_nvsk: {
        "label": "% against Potential Base",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "stackedBarChart": "select s.state_name, s.state_name as level, sum(ntae.sum) as achieved_certifications from datasets.nishtha_achievedcertification_chydbgqxd0rtzw5hz3zt as ntae JOIN dimensions.state as s ON s.state_id = ntae.state_id group by s.state_name ORDER BY s.state_name;",
                    },
                    "level": "district"
                }
            },
            {
                "name": "National",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                       // "barChart": "select d.district_name, d.district_name as level, sum(ntae.sum) as achieved_certifications from datasets.nishtha_achievedcertification_district0programnishtha as ntae JOIN dimensions.district as d ON d.district_id = ntae.district_id group by d.district_name ORDER BY d.district_name;",
                       "stackedBarChart": "select ntae.program_name, case when ntae.sum > nttcs.sum then 100 when ntae.sum = 0 and nttcs.sum = 0 then 0 else round(cast(ntae.sum / nttcs.sum * 100 as numeric), 2) end as achieved_certificates_per, (100 - case when ntae.sum > nttcs.sum then 100 when ntae.sum = 0 and nttcs.sum = 0 then 0 else round(cast(ntae.sum / nttcs.sum * 100 as numeric), 2) end ) as incomplete_certificates_per, ntae.sum as actual_certificates, nttcs.sum as expected_certificates from datasets.nishtha_total_certifications_achieved_programnishtha  as ntae join datasets.nishtha_total_target_certifications_programnishtha as nttcs on ntae.program_name = nttcs.program_name group by ntae.program_name, ntae.sum, nttcs.sum",
                     },
                    "level": "district"
                }
            },
        ],
        "options": {
            "stackedBarChart": {
                "isMultibar": true,
                "valueSuffix": "%",
                "type": "horizontal",
                "yAxis": {
                    "title": " Programs",
                    "label": "program_name",
                    "value": "program_name",
                },
                "xAxis": {
                    "title": "Achieved Certifications",
                    "metrics": [
                        {
                            "label": "Percentage of Certifications Achieved",
                            "value": "achieved_certificates_per",
                            "tooltipLabel":"Target Achieved",
                        },
                        {
                            "label": "Percentage of Certifications Remaining to be Achieved",
                            "value": "incomplete_certificates_per",
                            "tooltipLabel":"Actual Certification",
                            "tooltipValue": "actual_certificates",
                            "tooltipLabel1":"Total Expected Certification",
                            "tooltipValue1":"expected_certificates"
                        }
                    ]
                }
            }
        }
    },
        
   
    course_wise_status: {
        "label": "Course Wise Status",
        "defaultLevel": "state",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "barChart": "select t1.course_name , sum(t1.sum) as total_certifications from datasets.nishtha_totalcertification_crwedrorgzcbcxsof35_ as t1 group by t1.course_name",
                    },
                    "level": "state"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        // "table": "select t1.course_name , t1.sum as total_enrolment , t2.sum as total_certifications from datasets.nishtha_total_enrolment_coursenishtha as t1 join datasets.nishtha_total_certification_coursenishtha  as t2 on t1.course_name = t2.course_name group by t1.course_name,t1.sum,t2.sum ",
                        "barChart": "select t1.course_name , sum(t1.sum) as total_certifications from datasets.nishtha_totalcertification_crwedrorgzcbcxsof35_ as t1 group by t1.course_name",
                    },
                    "level": "district"
                }
            }
        ],
        // "options": {
        //     "barChart": {
        //         "isMultibar": true,
        //         "valueSuffix": "",
        //         "yAxis": {
        //             "title": "Total Enrolement and Certifications"
        //         },
        //         "xAxis": {
        //             "title": " Courses",
        //             "label": "course_name",
        //             "value": "course_name",
        //             "metrics": [
        //                 {
        //                     "label": "Total Entrolments",
        //                     "value": "total_enrolment"
        //                 },
        //                 {
        //                     "label": "Total Certifications",
        //                     "value": "total_certifications"
        //                 }
        //             ]
        //         }
        //     }
        // }
        "options": {
            "barChart": {
                "defaultPageSize": "30",
                "type": "horizontal",
                "isMultibar": true,
                "valueSuffix": "",
                "yAxis": {
                    "title": "Courses"
                },
                "xAxis": {
                    "title": " Total Enrolement and Certifications",
                    "label": "course_name",
                    "value": "course_name",
                    "metrics": [
                        {
                            "label": "Total Certifications",
                            "value": "total_certifications"
                        }
                    ]
                }
            },
            "table": {
                "columns": [
                    {
                        name: "Courses",
                        property: "course_name",
                        class: "text-center"
                    },
                    {
                        name: "Total Enrolments",
                        property: "total_enrolment",
                        class: "text-center"
                    },
                    {
                        name: "Total Certifications",
                        property: "total_certifications",
                        class: "text-center"
                    }
                ],
            }
        }
    },
    district_wise_status: {
        "label": "District Wise Status",
        "defaultLevel": "state",
        "filters": [
            // {
            //     "name": "National",
            //     "hierarchyLevel": "0",
            //     "actions": {
            //         "queries": {
            //             "barChart": "select d.state_name as level, d.state_name , sum(t1.sum) as total_enrolment , sum(t2.sum) as total_certification from datasets.nishtha_districtwiseenrolments_state0programnishtha as t1 join datasets.nishtha_districtwisecertifications_state0programnishtha as t2 on t1.state_id = t2.state_id join dimensions.state as d  on t2.state_id=d.state_id group by d.state_name order by d.state_name",
            //         },
            //         "level": "State"
            //     }
            // },
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "barChart": "select d.district_name, d.district_name as level , sum(t1.sum) as total_enrolment , sum(t2.sum) as total_certification from datasets.nishtha_consumptionenrolment_district0programnishtha as t1 join datasets.nishtha_consumptioncertification_district0programnishtha as t2 on t1.district_id = t2.district_id join dimensions.district as d  on t2.district_id=d.district_id group by d.district_name",
                    },
                    "level": "district"
                }
            }
        ],
        "options": {
            "barChart": {
                "type": "horizontal",
                "isMultibar": true,
                "valueSuffix": "",
                "yAxis": {
                    "title": ['States', 'Districts']
                },
                "xAxis": {
                    "title": "Total Enrolment and Certifications",
                    "label": "level",
                    "value": "level",
                    "metrics": [
                        {
                            "label": "Total Enrolments",
                            "value": "total_enrolment"
                        },
                        {
                            "label": "Total Certifications",
                            "value": "total_certification"
                        }
                    ]
                }
            }
        }
    },
    summary_metrics: {
        "label": "Progress Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": `SELECT count(program_name) as programs FROM( SELECT DISTINCT CASE
                            WHEN program_name LIKE 'NISHTHA_Elementary%' THEN 'NISHTHA Elementary'
                            ELSE program_name
                            END AS program_name
                            FROM dimensions.programnishtha) as programnishtha;`,
                        "bigNumber2": "select sum(sum) as beneficiaries from datasets.nishtha_total_participants_programnishtha"
                    },
                    "level": "state"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": `SELECT count(program_name) as programs FROM( SELECT DISTINCT CASE
                            WHEN program_name LIKE 'NISHTHA_Elementary%' THEN 'NISHTHA Elementary'
                            ELSE program_name
                            END AS program_name
                            FROM dimensions.programnishtha) as programnishtha;`,
                        "bigNumber2": "select sum(sum) as beneficiaries from datasets.nishtha_total_participants_programnishtha"
                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['No. of Programs', 'No. of beneficiaries'],
                "valueSuffix": ['', ''],
                "property": ['programs', 'beneficiaries']
            }
        }
    },
    nishtha_metrics: {
        "label": "Progress Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "",
                        "bigNumber2": "",
                        "bigNumber3": "select sum(sum) as participants_3 from datasets.nishtha_total_participants_programnishtha where program_name = 'NISHTHA Secondary'",
                        "bigNumber4": "select sum(sum) as participants_4 from datasets.nishtha_total_participants_programnishtha where program_name = 'NISHTHA FLN'",
                        "bigNumber5": "select sum(sum) as participants_5 from datasets.nishtha_total_participants_programnishtha where program_name = 'NISHTHA ECCE'",
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
                        "bigNumber1": "",
                        "bigNumber2": "",
                        "bigNumber3": "",
                        "bigNumber4": "",
                        "bigNumber5": "",
                        "bigNumber6": "select sum(sum) as participants_6 from datasets.nishtha_total_participants_programnishtha where program_name = 'NISHTHA 4.0'"
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['NISHTHA Elementary (Face-to-face)', 'NISHTHA Elementary (Online)', 'NISHTHA Secondary', 'NISHTHA FLN', 'NISHTHA ECCE', 'NISHTHA 4.0'],
                "valueSuffix": ['', '', '', '', '', ''],
                "property": ['participants_1', 'participants_2', 'participants_3', 'participants_4', 'participants_5', 'participants_6']
            }
        }
    }
}
