export const config = {
    filters: [
        {
            "label": "District Wise Performance",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categoryudise"
        },
        {
            "label": "District Wise Performance",
            "name": "State",
            "labelProp": "state_name",
            "valueProp": "state_id",
            "id": "state_name",
            "query": "select state_id,state_name from dimensions.state order by state_name"
        },
        {
            "label": "State Wise Performance",
            "name": "Metric",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "query": "select category_name from dimensions.categoryudise"
        },
        {
            "label": "Correlation",
            "name": "X-axis",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "axis": 'x',
            "query": "select category_name from dimensions.categoryudise"
        },
        {
            "label": "Correlation",
            "name": "Y-axis",
            "labelProp": "category_name",
            "valueProp": "category_name",
            "id": "metric",
            "axis": 'y',
            "query": "select category_name from dimensions.categoryudise"
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
                        "map": "select d.latitude, d.longitude, t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.udise_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "downloadConfig": {
                "fileName": "Implementation Status",
                "excludeColumns": ['indicator', 'tooltip', 'Latitude', 'Longitude']
            },
            "map": {
                "metricFilterNeeded": false,
                "indicator": "status",
                "legend": {
                    "title": "Implemented UDISE+"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Implemented UDISE+: ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    district_wise_performance: {
        "label": "District Wise Performance",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map": "select t2.district_name, t1.district_id ,latitude, longitude, t1.category_name,round(cast(sum(t1.sum) as numeric ),2) as percentage from datasets.udise_category_district0categoryudise as t1 join dimensions.district as t2 on t2.district_id = t1.district_id group by t1.district_id, t2.district_name,t1.category_name, latitude, longitude order by t1.category_name"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                },
                {
                    "name": "State",
                    "hierarchyLevel": "1",
                    "actions":
                    {
                        "queries":
                        {
                            "map": "select t2.district_name, t1.district_id , t1.category_name,latitude, longitude,round(cast(sum(t1.sum) as numeric ),2) as percentage from datasets.udise_category_district0categoryudise as t1 join dimensions.district as t2 on t2.district_id = t1.district_id group by t1.district_id, t2.district_name,t1.category_name, latitude, longitude order by t1.category_name"
                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options":
        {
            "downloadConfig": {
                "fileName": "District Wise Performance",
                "excludeColumns": ['indicator', 'category_name', 'percentage', 'tooltip', 'Latitude', 'Longitude']
            },
            "map":
            {
                "indicatorType": "percent",
                "metricLabelProp": "category_name",
                "metricValueProp": "percentage",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District Wise Performance " },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    correlation:{
        "label": "Correlation",
        "filters":
            [
                {
                    "name": "State",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "scatter": "select t2.district_name, t1.category_name,round(cast(sum(t1.sum) as numeric ),2) as percentage from datasets.udise_category_district0categoryudise as t1 join dimensions.district as t2 on t2.district_id = t1.district_id group by t2.district_name,t1.category_name"
                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options": {
            "barChart": {
                "groupByNeeded": true,
                "groupByLabel": 'district_name',
                "metricLabelProp": "category_name",
                "metricValueProp": "percentage",
                "valueSuffix": "%",
                "yAxis": {
                },
                "xAxis": {
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": ""
                    }
                ]
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
                        "bigNumber1": "select dm.metric_value as total_school_surveyed from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='Total Schools Surveyed' and dm.metric_type ='Key Metric'",
                        "bigNumber2": "select dm.metric_value as total_teachers from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='Total Teachers' and dm.metric_type ='Key Metric'",
                    },
                    "level": "state"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Schools Surveyed', 'Total Teachers'],
                "valueSuffix": ['L', 'L'],
                "property": ['total_school_surveyed', 'total_teachers']
            }
        }
    },
    udise_metrics: {
        "label": "District Wise Performance",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "select dm.metric_value as total_students from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='Total Students' and dm.metric_type ='Vanity Metric'",
                        "bigNumber2": "select dm.metric_value as ptr from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='PTR' and dm.metric_type ='Vanity Metric'",
                        "bigNumber3": "select dm.metric_value as schs_having_electricity from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='% schools with electricity connection' and dm.metric_type ='Vanity Metric'",
                        "bigNumber4": "select dm.metric_value as schs_having_library  from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='% schools with Library' and dm.metric_type ='Vanity Metric'",
                        "bigNumber5": "select dm.metric_value as schs_with_toilet  from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='% schools with toilets' and dm.metric_type ='Vanity Metric'",
                        "bigNumber6": "select dm.metric_value as schs_having_water from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='% schools with drinking water' and dm.metric_type ='Vanity Metric'",
                        "bigNumber7": "select dm.metric_value as schs_with_ramp from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='% schools with ramp' and dm.metric_type ='Vanity Metric'",
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
                        "bigNumber1": "select dm.metric_value as total_students from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='Total Students' and dm.metric_type ='Vanity Metric'",
                        "bigNumber2": "select dm.metric_value as ptr from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='PTR' and dm.metric_type ='Vanity Metric'",
                        "bigNumber3": "select dm.metric_value as schs_having_electricity from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='% schools with electricity connection' and dm.metric_type ='Vanity Metric'",
                        "bigNumber4": "select dm.metric_value as schs_having_library  from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='% schools with Library' and dm.metric_type ='Vanity Metric'",
                        "bigNumber5": "select dm.metric_value as schs_with_toilet  from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='% schools with toilets' and dm.metric_type ='Vanity Metric'",
                        "bigNumber6": "select dm.metric_value as schs_having_water from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='% schools with drinking water' and dm.metric_type ='Vanity Metric'",
                        "bigNumber7": "select dm.metric_value as schs_with_ramp from datasets.dashboard_mainmetrics dm where  dm.program_id='udise' and dm.metric_name ='% schools with ramp' and dm.metric_type ='Vanity Metric'",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Students', 'PTR', '% Schools with electricity connection', '% Schools with Library', '% Schools with toilets', '% Schools with drinking water', '% Schools with ramp'],
                "valueSuffix": ['Cr', '', '%', '%', '%', '%', '%'],
                "property": ['total_students', 'ptr', 'schs_having_electricity', 'schs_having_library', 'schs_with_toilet', 'schs_having_water', 'schs_with_ramp']
            }
        }
    },
    state_wise_performance: {
        "label": "State Wise Performance",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map": "select t2.latitude, t2.longitude, t2.state_name, t1.state_id, t1.state_id as level, t1.category_name, sum(t1.sum) as category_value, round(cast(sum(t1.avg) as numeric ),2) as percentage from datasets.udise_category_state0categoryudise as t1 join dimensions.state as t2 on t2.state_id = t1.state_id group by t1.state_id, t2.state_name,t1.category_name, t2.latitude, t2.longitude order by t1.category_name"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                },
                {
                    "name": "State",
                    "hierarchyLevel": "1",
                    "actions":
                    {
                        "queries":
                        {
                            "map": "select t2.district_name, t1.district_id, t1.district_id as level , t1.category_name,latitude, longitude,round(cast(sum(t1.sum) as numeric ),2) as percentage from datasets.udise_category_district0categoryudise as t1 join dimensions.district as t2 on t2.district_id = t1.district_id where t2.state_id = {state_id} group by t1.district_id, t2.district_name,t1.category_name, latitude, longitude order by t1.category_name"
                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options":
        {
            "downloadConfig": {
                "fileName": "State Wise Performance",
                "excludeColumns": ['indicator', 'tooltip', 'category_name', 'level', 'percentage', 'Latitude', 'Longitude']
            },
            "map":
            {
                "indicatorType": "percent",
                "metricLabelProp": "category_name",
                "metricValueProp": "percentage",
                "groupByColumn": "level",
                "indicator": "percentage",
                "metricFilterNeeded": true,
                "legend": { "title": "State Wise Performance " },
                "drillDownConfig": {
                    "enableDrillDown": true,
                    "allowedLevels": [0]
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/UT name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
}