export const config = {
    filters: [
        {
            "label": "Learning Sessions",
            "name": "Subject",
            "labelProp": "subject",
            "valueProp": "subject",
            "id": "subject",
            "query": "select distinct(subject) from datasets.nipun_bharat_totallearningsessions_grade0subject order by subject"
        }
    ],
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
                        "barChart": "select textbook_name as textbook, round(cast(avg(sum) as numeric),2) as lo_covered from datasets.nipun_bharat_perc_los_covered_textbooknipun group by textbook order by textbook",
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
    nipun_bharat_metrics: {
        "label": "Textbook Status",
        "filters": [
            {
                "name": "National",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "select sum(sum) as total_learning_sessions from datasets.nipun_bharat_totallearningsessions_grade0subject",
                        "bigNumber2": "select count(*) as total_digital_books from datasets.nipun_bharat_totallearningsessions_grade0subject",
                        "bigNumber3": "select sum(sum) as total_learning_sessions from datasets.nipun_bharat_totallearningsessions_grade0subject",
                        "bigNumber4": "select sum(sum) as total_learning_sessions from datasets.nipun_bharat_totallearningsessions_grade0subject",
                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Learning Sessions','Total Digital Books','Total Content', 'Total Learning Outcomes (LOs) Covered'],
                "valueSuffix": ['','','',''],
                "property": ['total_learning_sessions','total_digital_books','','total_learning_sessions']
            }
        }
    }
}