export const config = {     
    summary_metrics: {
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "select dm.metric_value as total_school_surveyed from dimensions.mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='Total Schools Surveyed' and dm.metric_type ='Key Metric'",
                        "bigNumber2": "select dm.metric_value as total_teachers from dimensions.mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='Total Teachers' and dm.metric_type ='Key Metric'",
                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Schools Surveyed', 'Total Teachers'],
                //"valueSuffix": ['L', 'L'],
                "valueSuffix": ['', ''],
                "property": ['total_school_surveyed', 'total_teachers']
            }
        }
    }
}