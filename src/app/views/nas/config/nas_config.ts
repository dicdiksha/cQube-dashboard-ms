export const config = {
    filters: [
        {
            "label": "District Wise Performance",
            "name": "Grade",
            "id": "grade",
            "tableAlias": "t",
            "labelProp": "grade",
            "valueProp": "grade",
            "columnName": "grade",
            "query": "select grade from datasets.nas_performance_grade as t"
        },
        {
            "label": "District Wise Performance",
            "name": "Subject",
            "id": "subject",
            "tableAlias": "t",
            "labelProp": "subject",
            "valueProp": "subject",
            "columnName": "subject",
            "query": "select distinct(subject) from datasets.nas_performance_district0lonas0subject0grade as t order by subject"
        },
        {
            "label": "District Wise Performance",
            "name": "Learning Outcome Code",
            "tableAlias": "t",
            "id": "lo_code",
            "labelProp": "lo_code",
            "valueProp": "lo_code",
            "columnName": "lo_code",
            "query": "select distinct(lo_code) from datasets.nas_performance_district0lonas0subject0grade as t order by lo_code"
        },
        {
            "label": "District Wise Performance",
            "name": "State",
            "id": "state_name",
            "labelProp": "state_name",
            "valueProp": "state_name",
            "columnName": "state_name",
            "selectDefaultValue": false,
            "query": "select distinct(state_name) from datasets.nas_performance_state0lonas0subject0grade as t join dimensions.state as d on d.state_id = t.state_id order by state_name"
        },
        {
            "label": "Grade & Subject Performance",
            "name": "Grade",
            "tableAlias": "t",
            "id": "grade",
            "labelProp": "grade",
            "valueProp": "grade",
            "columnName": "grade",
            "query": "select grade from datasets.nas_performance_grade as t"
        },
        {
            "label": "Grade & Subject Performance",      
            "name": "Subject",
            "id": "subject",
            "tableAlias": "t",
            "labelProp": "subject",
            "valueProp": "subject",
            "columnName": "subject",
            "query": "select distinct(subject) from datasets.nas_performance_state0lonas0subject0grade as t order by subject"
        },
        {
            "label": "Grade & Subject Performance",
            "name": "State",
            "id": "state_name",
            "labelProp": "state_name",
            "valueProp": "state_name",
            "columnName": "state_name",
            "selectDefaultValue": false,
            "query": "select distinct(state_name) from datasets.nas_performance_state0lonas0subject0grade as t join dimensions.state as d on d.state_id = t.state_id order by state_name"
        },
        {
            "label": "State Wise Performance",
            "name": "Grade",
            "id": "grade",
            "tableAlias": "t",
            "labelProp": "grade",
            "valueProp": "grade",
            "columnName": "grade",
            "query": "select grade from datasets.nas_performance_grade as t"
        },
        {
            "label": "State Wise Performance",
            "name": "Subject",
            "id": "subject",
            "tableAlias": "t",
            "labelProp": "subject",
            "valueProp": "subject",
            "columnName": "subject",
            "query": "select distinct(subject) from datasets.nas_performance_state0lonas0subject0grade as t order by subject"
        },
        {
            "label": "State Wise Performance",
            "name": "Learning Outcome Code",
            "id": "lo_code",
            "tableAlias": "t",
            "labelProp": "lo_code",
            "valueProp": "lo_code",
            "columnName": "lo_code",
            "query": "select distinct(lo_code) from datasets.nas_performance_state0lonas0subject0grade as t order by lo_code"
        },

    ],
    nas_implementation_status: {
        "label": "Implementation Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select d.latitude, d.longitude, t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.nas_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
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
                    "title": "Implemented NAS"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name :",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Implemented NAS : ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    
    district_wise_performance:
    {
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
                            "map":"select t.district_id, district_name,latitude,longitude, lo_name, round(cast(avg(t.sum) as numeric ),2) as performance from datasets.nas_performance_district0lonas0subject0grade as t join dimensions.lonas as lo on t.lo_code = lo.lo_code join dimensions.district as d on t.district_id = d.district_id group by t.district_id, district_name,lo_name,latitude,longitude"
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
                        "queries": {
                            "map": "select t.lo_code, round(cast(avg(t.sum) as numeric),2) as performance, t.district_id, district_name, latitude, longitude from datasets.nas_performance_district0lonas0subject0grade as t join dimensions.district as d on t.district_id = d.district_id join datasets.nas_performance_lonas as l on t.lo_code = l.lo_code group by t.district_id, district_name, t.lo_code, latitude, longitude"
                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options":
        {
            "map":
            {
                "indicator": "performance",
                "indicatorType": "percent",
                "legend": {
                    "title": "NAS Performance"
                },
                "tooltipMetrics":
                    [
                        {
                            "valuePrefix": "District Name: ",
                            "value": "district_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Learning Outcome: ",
                            "value": "lo_code",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Learning Outcome: ",
                            "value": "lo_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Performance: ",
                            "value": "performance",
                            "valueSuffix": "%\n"
                        }
                    ]
            }
        }
    },

    grade_and_subject_performance: {
        "label": "Grade & Subject Performance",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions":
                {
                    "queries": {
                        "table": "select t.lo_code, grade, subject, round(cast(avg(t.sum) as numeric),2) as performance, state_name, state_name as location from datasets.nas_performance_state0lonas0subject0grade as t join dimensions.state as d on t.state_id = d.state_id group by t.state_id, state_name, subject, grade, t.lo_code"
                    },
                    "queriesState": {
                        "table": "select t.lo_code, grade, subject, ROUND(CAST(avg(t.sum) AS numeric), 2) AS performance, district_name, district_name as location from datasets.nas_performance_district0lonas0subject0grade as t join dimensions.district as d on t.district_id = d.district_id group by t.district_id, district_name, subject, grade, t.lo_code, t.lo_code"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions":
                {
                    "queries": {
                        "table": "select t.lo_code, grade, subject, ROUND(CAST(avg(t.sum) AS numeric), 2) AS performance, district_name, district_name as location from datasets.nas_performance_district0lonas0subject0grade as t join dimensions.district as d on t.district_id = d.district_id join datasets.nas_performance_lonas as l on t.lo_code = l.lo_code group by t.district_id, district_name, subject, grade, t.lo_code, t.lo_code"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            }
        ],
        "options": {
            "table": {
                "groupByNeeded": true,
                "metricLabelProp": "location",
                "metricValueProp": "performance",
                "columns": [
                    {
                        name: "Learning Outcome Code",
                        property: "lo_code",
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade",
                        class: "text-center"
                    },
                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "Location",
                        groupByNeeded: true,
                        property: "location",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                   // color: "#007000",
                                    color: "#1D4586",
                                    breakPoint: 70
                                },
                                {
                                  //  color: "#FFBF00",
                                    color: "#1156CC",
                                    breakPoint: 40
                                },
                                {
                                  //  color: "#D2222D",
                                    color: "#6D9FEB",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "lo_code",
                "sortDirection": "asc"
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
                    "bigNumber1": "select dm.metric_value as total_school_served from dimensions.mainmetrics dm where  dm.program_id='nas' and dm.metric_name ='Total Schools Surveyed' and dm.metric_type ='Key Metric'",
                    "bigNumber2": "select dm.metric_value as total_student_served from dimensions.mainmetrics dm where  dm.program_id='nas' and dm.metric_name ='Total Students Surveyed' and dm.metric_type ='Key Metric'",
                    },
                "level": "state"
            }
        },
    ],
    "options": {
        "bigNumber": {
            "title": ['Total Schools Surveyed','Total Students Surveyed'],
            //"valueSuffix": ['L', 'L'],
            "valueSuffix": ['', ''],
            "property": ['total_school_served', 'total_student_served'],          
        }
    }
},
    nas_metrics: {
        "label": "District Wise Performance",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "bigNumber1": "select count(distinct state_id) as total_states from datasets.nas_started_state where sum > 0",
                        "bigNumber2": "select count(lo_code) as total_lo_tested from datasets.nas_no_of_teachers_lonas",
                        "bigNumber3": "select dm.metric_value as total_teachers from dimensions.mainmetrics dm where  dm.program_id='nas' and dm.metric_name ='Total Teachers' and dm.metric_type ='Vanity Metric'"
                        },
                    "level": "State"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select count(distinct state_id) as total_states from datasets.nas_started_state where sum > 0",
                        "bigNumber2": "select count(lo_code) as total_lo_tested from datasets.nas_no_of_teachers_lonas",
                        "bigNumber3": "select dm.metric_value as total_teachers from dimensions.mainmetrics dm where  dm.program_id='nas' and dm.metric_name ='Total Teachers' and dm.metric_type ='Vanity Metric'"
                        },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total States/UTs Participating', 'Total LOs Tested', 'Total Teachers'],
				//"valueSuffix": ['', '','L'],
                "valueSuffix": ['', '',''],
                "property": ['total_states', 'total_lo_tested','total_teachers']
            }
        }
    },

    nas_state_wise_performance: {
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
                            "map":"select latitude, longitude, t.state_id, state_name,lo_name, round(cast(avg(t.sum) as numeric ),2) as performance from datasets.nas_performance_state0lonas0subject0grade as t join dimensions.state as s on t.state_id = s.state_id join dimensions.lonas as lo on t.lo_code = lo.lo_code group by t.state_id, state_name, lo_name, latitude, longitude"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                }
            ],
        "options":
        {
            "map":
            {
                "indicatorType": "percent",
                "indicator": "performance",
                "legend": {
                    "title": "State Wise Performance"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/UT Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Learning Outcome :",
                        "value": "lo_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Performance: ",
                        "value": "performance",
                        "valueSuffix": "%\n"
                    }
                ]
            }
        }
    }
}