export const config = {
    summary_metrics: {
        "filters": [
        {
            "name": "National",
            "hierarchyLevel": "0",
            "actions": {
                "queries": {
                    "bigNumber1": "select dm.metric_value as total_users from datasets.dashboard_mainmetrics dm where  dm.program_id='prashast' and dm.metric_name ='Total registered Users' and dm.metric_type ='Key Metric'",
                    "bigNumber2": "select dm.metric_value as total_student from datasets.dashboard_mainmetrics dm where  dm.program_id='prashast' and dm.metric_name ='Total students' and dm.metric_type ='Key Metric'",
                    },
                "level": "state"
            }
        },
    ],
    "options": {
        "bigNumber": {
            "title": ['Total registered Users','Total students'],
            "property": ['total_users', 'total_student'],
            "valueSuffix": ['L', 'L'],
        }
    }
},
    prashast_metrics: {
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "select dm.metric_value as total_school from datasets.dashboard_mainmetrics dm where  dm.program_id='prashast' and dm.metric_name ='Total Schools' and dm.metric_type ='Vanity Metric'",
                        "bigNumber2": "select dm.metric_value as total_teachers from datasets.dashboard_mainmetrics dm where  dm.program_id='prashast' and dm.metric_name ='Total Teachers' and dm.metric_type ='Vanity Metric'",
                        "bigNumber3": "select dm.metric_value as total_pri_head from datasets.dashboard_mainmetrics dm where  dm.program_id='prashast' and dm.metric_name ='Total Principal/Headmaster' and dm.metric_type ='Vanity Metric'",
                        "bigNumber4": "select dm.metric_value as total_special_edu  from datasets.dashboard_mainmetrics dm where  dm.program_id='prashast' and dm.metric_name ='Total Special Educators' and dm.metric_type ='Vanity Metric'",
                        "bigNumber5": "select dm.metric_value as total_survey_1  from datasets.dashboard_mainmetrics dm where  dm.program_id='prashast' and dm.metric_name ='Total Survey Part-1' and dm.metric_type ='Vanity Metric'",
                        "bigNumber6": "select dm.metric_value as total_survey_2 from datasets.dashboard_mainmetrics dm where  dm.program_id='prashast' and dm.metric_name ='Total Survey Part-2' and dm.metric_type ='Vanity Metric'",
                        
                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Schools', 'Total Teachers', 'Total Principal/Headmaster','Total Special Educators','Survey Part-1','Survey Part-2'],
                "property": ['total_school', 'total_teachers', 'total_pri_head', 'total_special_edu', 'total_survey_1', 'total_survey_2'],
                "valueSuffix": ['L', 'L', 'L', '', 'L', 'L'],
            }
        }
        
    
    }
}