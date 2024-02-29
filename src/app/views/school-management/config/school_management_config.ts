export const config = {
  
    summary_metrics: {
        "filters": [
        {
            "name": "National",
            "hierarchyLevel": "0",
            "actions": {
                "queries": {
                    "bigNumber1": "10",
                    "bigNumber2": "20",
                   },
                "level": "state"
            }
        },
    ],
    "options": {
        "bigNumber": {
            "title": ['No. of Student', 'No. of Teachers'],
                "formatter": { locale: 'en-IN', format: "short" }
      
        }
    }
}

}

