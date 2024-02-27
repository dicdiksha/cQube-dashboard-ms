import _ from "lodash";
import { numberLabelFormatForReport } from "src/app/utilities/NumberFomatter";
const height = window.innerHeight;
const width = window.innerWidth;
/*

768 - 14
1024 - 12
1280 - 12
1366 - 13
1440 - 13
1536 - 14
1680 - 14
1920 - 15
2560 - 16
2880 - 17
3840 - 18
*/

const enum screenResolutionFonts {
    "Default" = 14,
    "S768" = 14,
    "S1024" = 15,
    "S1280" = 15,
    "S1366" = 14,
    "S1440" = 14,
    "S1536" = 14,
    "S1680" = 14,
    "S1920" = 14,
    "S2560" = 14,
    "S2880" = 14,
    "S3840" = 14,
} 

const fontSize = window.innerWidth > 1024 ? Math.round(window.innerWidth / 100) : 14;

export const ChartJSConfig = {
    bar: {
        minBarLength: 8,
        barThickness: 40,
        maxBarThickness: 100
    },
    multiBar: {
        minBarLength: 8,
        barThickness: 15,
        maxBarThickness: 50
    },
    stackedBar: {
        minBarLength: 8,
        barThickness: 10,
        maxBarThickness: 12
    },
    scatter: {
        pointBorderColor: '#7cd6cc',
        pointBorderWidth: 0.5,
        pointRadius: 8,
        pointHoverRadius: 8
    },
    colors: [
        "#6C63F0",
        "#808080",
        "#2171b5",
        "#ddd"
    ]
};

export function getChartJSConfig(config: any): any {
    let defaultOptions = {
        options: {
            legend: {
                labels: {
                    fontSize
                }
            },
            tooltips: {
                mode: 'index',
                cornerRadius: 10,
                displayColors: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFontFamily: 'verdana',
                titleFontColor: '#fff',
                titleFontSize: fontSize,
                bodyFontFamily: 'verdana',
                bodyFontColor: '#fff',
                bodyFontSize: fontSize,
                custom: function (tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(252, 239, 252)",
                    },
                    ticks: {
                        beginAtZero: true,
                        fontSize,
                        callback: function(value) { 
                            return numberLabelFormatForReport(value);
                        }
                    },
                    scaleLabel: {
                        fontSize
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(252, 239, 252)",
                    },
                    ticks: {
                        beginAtZero: true,
                        fontSize,
                        callback: function(value) { 
                            return numberLabelFormatForReport(value);
                        }
                    },
                    scaleLabel: {
                        fontSize
                    }
                }]
            }
        }
    };
    return _.merge(defaultOptions, config);
}

export function getBarDatasetConfig(dataset: any,  isMulti?: any, useSingleColor?: boolean, defOptions?: any): any {
    dataset = dataset.map((rec, index) => {
        let options = defOptions;
        if (!options) {
            if(isMulti) {
                options = ChartJSConfig.multiBar;
            }
            else {
                options = ChartJSConfig.bar;
            }
        }

        if (!useSingleColor) {
            if (ChartJSConfig.colors[index]) {
                options = {
                    ...options,
                    backgroundColor: ChartJSConfig.colors[index],
                    hoverBackgroundColor: ChartJSConfig.colors[index]
                };
            }
        } else {
            options = {
                ...options,
                backgroundColor: ChartJSConfig.colors[0],
                hoverBackgroundColor: ChartJSConfig.colors[0]
            };
        }

        rec = Object.assign(options, rec);
        return rec;
    });

    return dataset;
}

export function getScatterDatasetConfig(dataset: any, useSingleColor?: boolean): any {
    dataset = dataset.map((rec, index) => {
        let options: any = ChartJSConfig.scatter;

        if (!useSingleColor) {
            if (ChartJSConfig.colors[index]) {
                options = {
                    ...options,
                    pointBackgroundColor: ChartJSConfig.colors[index],
                    pointHoverBackgroundColor: ChartJSConfig.colors[index]
                };
            }
        } else {
            options = {
                ...options,
                pointBackgroundColor: ChartJSConfig.colors[0],
                pointHoverBackgroundColor: ChartJSConfig.colors[0]
            };
        }

        rec = Object.assign(options, rec);
        return rec;
    });

    return dataset;
}
