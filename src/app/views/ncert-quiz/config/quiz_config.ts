export const config = {
    filters: [
        {
            "label": "Participation Status",
            "name": "Quiz Name",
            "tableAlias": "t",
            "id": "",
            "labelProp": "quiz_name",
            "valueProp": "quiz_name",
            "query": "SELECT quiz_name FROM dimensions.quizncert ORDER BY id ASC "
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
                        "map": "select d.latitude, d.longitude, t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.ncert_quiz_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "downloadConfig": {
                "fileName": "Progress Status",
                "excludeColumns": ['indicator', 'tooltip', 'Latitude', 'Longitude']
            },
            "map": {
                "metricFilterNeeded": false,
                "indicator": "status",
                "legend": {
                    "title": "NCERT Quizzes Started"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name :",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "NCERT Quizzes Started :",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    participation_status:
    {
        "label": "Participation Status",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map":"select t2.latitude, t2.longitude, t.state_id,state_name, quiz_name,sum(sum) as enrollments from datasets.ncert_quiz_totalenrollments_state0quizncert as t join dimensions.state as t2 on t.state_id=t2.state_id group by t.state_id,quiz_name,state_name, t2.latitude, t2.longitude"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                },
            ],
        "options":
        {
            "downloadConfig": {
                "fileName": "Progress Status",
                "excludeColumns": ['indicator', 'tooltip', 'Latitude', 'Longitude']
            },
            "map":
            {
                "indicator": "enrollments",
                "legend": {
                    "title": "Participation Status"
                },
                "tooltipMetrics":
                    [
                        {
                            "valuePrefix": "State UT/Name : ",
                            "value": "state_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Quiz Name: ",
                            "value": "quiz_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Enrollments: ",
                            "value": "enrollments",
                            "valueSuffix": "\n"
                        },
                    ]
            }
        }
    },
    quiz_wise_status: {
        "label": "Quiz wise Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "table":"select t1.quiz_name, sum(t1.sum) as total_enrolments, sum(t2.sum) as certificate_issued,avg(t3.sum) as completion,t1.medium from datasets.ncert_quiz_totalenrolments_quizncert0medium as t1 join datasets.ncert_quiz_certificateissued_quizncert0medium as t2 on t1.quiz_name = t2.quiz_name and t1.medium = t2.medium join datasets.ncert_quiz_completionperc_quizncert0medium as t3 on t2.quiz_name=t3.quiz_name and t1.medium = t3.medium group by t1.quiz_name,t1.medium",
                        },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Quiz Name",
                        property: "quiz_name",
                        class: "text-center"
                    },
                    {
                        name: "Total Enrolments",
                        property: "total_enrolments",
                        class: "text-center"
                    },
                    {
                        name: "Certificate Issued (100% completion)",
                        property: "certificate_issued",
                        class: "text-center"
                    },
                    {
                        name: "Completion %",
                        property: "completion",
                        class: "text-center",
                        valueSuffix: "%",
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
                    },
                    {
                        name: "Medium",
                        property: "medium",
                        class: "text-center"
                    }
                ],
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
                    "bigNumber1": "select sum(sum) as total_enrolment from datasets.ncert_quiz_total_enrolments_medium where sum > 0",
                    "bigNumber2": "select sum(sum) as total_certification from datasets.ncert_quiz_certificate_issued_100_perc_completion_medium",
                    },
                "level": "state"
            }
        },
    ],
    "options": {
        "bigNumber": {
            "title": ['Total Enrolment','Total Certification'],
            "valueSuffix": ['',''],
            "property": ['total_enrolment','total_certification']
        }
    }
},
    quiz_metrics: {
        "label": "Progress Status",
        "filters": [
            {
                "name": "National",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "select count(distinct quiz_name) as total_quizzes from dimensions.quizncert",
                        "bigNumber2": "select count(distinct medium) as total_medium from datasets.ncert_quiz_completion_perc_medium;",
                        "bigNumber3": "select count(distinct state_id) as total_states from datasets.ncert_quiz_started_state where sum > 0;",
                        "bigNumber4": "select sum(sum) as total_enrolment from datasets.ncert_quiz_total_enrolments_medium;",
                        "bigNumber5": "select sum(sum) as total_certification from datasets.ncert_quiz_certificate_issued_100_perc_completion_medium",
                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Quizzes', 'Total Medium', 'Total States/UTs Participating', 'Total Enrolment', 'Total Certification'],
                "property": ['total_quizzes', 'total_medium', 'total_states', 'total_enrolment', 'total_certification'],
                "valueSuffix": ['', '', '', '', '']
            }
        }
    }
}