export const config = {     
    summary_metrics: {
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "select dm.metric_value as total_school_served from dimensions.mainmetrics dm where  dm.program_id='nas' and dm.metric_name ='Total Schools Surveyed' and dm.metric_type ='Key Metric'",
                        "bigNumber2": "select dm.metric_value as total_student_served from dimensions.mainmetrics dm where  dm.program_id='nas' and dm.metric_name ='Total Students Surveyed' and dm.metric_type ='Key Metric'",
                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Schools Surveyed', 'Total Students Surveyed'],
                "valueSuffix": ['', ''],
                "property": ['total_school_served', 'total_student_served'],
            }
        }
    }
}