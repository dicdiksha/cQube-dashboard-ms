export const config = {     
    summary_metrics: {
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": `select count(state_id) as total_state from datasets.pgi_started_state`,
                        //hardcoded value '70' is written for second main metrics 'Total parameters', as raw data file does not have total parameters list
                        "bigNumber2": "select dm.metric_value as total_parameters from dimensions.mainmetrics dm where  dm.program_id='pgi' and dm.metric_name ='Total Parameters' and dm.metric_type ='Key Metric'"
                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total States/UTs', 'Total Parameters'],
                "valueSuffix": ['', ''],
                "property": ['total_state', 'total_parameters']
            }
        }
    }
}