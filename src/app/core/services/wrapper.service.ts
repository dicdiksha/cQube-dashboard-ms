import { Injectable } from '@angular/core';
import { parseQueryParam } from 'src/app/utilities/QueryBuilder';
import { CommonService } from './common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class WrapperService {

  constructor(private readonly _commonService: CommonService,private spinner: NgxSpinnerService) { }

  async constructFilters(filters: any, filtersConfig: any): Promise<any> {
    // filtersConfig.forEach((filter, index) => {
      this.spinner.show()
    for (let index = 0; index < filtersConfig.length; index++) {
      let filter = filtersConfig[index]
      let query = this.parseQuery(filtersConfig, filters, index);
      if (query && query.indexOf('{') === -1) {
        let res = await this.runQuery(query);
        if (res) {
          let rows = res;
          let findFilter = filters.find(fil => fil.valueProp === filter.valueProp);
          if (findFilter) {
            findFilter = {
              ...findFilter,
              options: rows.map(row => ({
                label: row[filter.labelProp],
                value: row[filter.valueProp],
              }))
            }
          } else {
            filters.push({
              ...filter,
              value: null,
              options: rows.map(row => ({
                label: row[filter.labelProp],
                value: row[filter.valueProp],
              }))
            });
          }
        }

      }
    };
    this.spinner.hide()
    return filters;
  }

  async constructCommonFilters(filterConfig: any, tabLabel?: any, updatedFilter?: any, changedInd?: any, defaultFilterApplied?:boolean) {
    this.spinner.show();
    let filters: any = []
    if (tabLabel) {
      filterConfig = filterConfig.filter((filter: any) => {
        return filter.label === tabLabel
      })
    }
    console.log('sdghvfhvdsghfvh', tabLabel, filterConfig);
    for (let index = 0; index < filterConfig.length; index++) {

      if (changedInd === undefined || (changedInd < index && filterConfig[changedInd]?.dependentFilter)) {
        let filter = filterConfig[index];
        filter.options = [];
        filter.value = null;

        if (filter.values?.length > 0 && Array.isArray(filter.values) && typeof filter.values?.[0] === 'object') {
          filter.options = filter.values
        }

        else if (filter.values && filter.values.length > 0 && Array.isArray(filter.values)) {
          filter.values.forEach((option) => {
            filter.options.push({
              value: option,
              label: option
            })
          });
        }
        let query = filter.values === undefined ? filter.query : undefined
        if (query?.indexOf(filters[index - 1]?.id) > -1 && filters[index - 1]?.value !== undefined && updatedFilter) {
          query = parseQueryParam(query, { [filters[index - 1]?.valueProp]: filters[index - 1]?.value })
        }
        if (query) {
          let res = await this.runQuery(query);
          if (res) {
            let rows = res;
            filter.options = rows.map((row) => {
              return {
                value: row?.[filter.valueProp],
                label: row?.[filter.labelProp]
              }
            })
          }
        }
        if(defaultFilterApplied != true){
            filter.value = (changedInd === index && filterConfig[index]?.dependentFilter) ? updatedFilter[index].value : filter.options?.[0]?.value
        }
        filters.push(filter)
      }
      else {
        filters.push(updatedFilter[index])
      }
    }
    this.spinner.hide()
    return filters;
  }

  runQuery(query: string): any {
    return new Promise((resolve, reject) => {
      this.spinner.show();
      try {
        this._commonService.getReportDataNew(query).subscribe((res: any) => {
          this.spinner.hide()
          resolve(res);
        },
          (error) => {
            this.spinner.hide()
            resolve(undefined)
          },
        );
      } catch (error) {
        this.spinner.hide()
        reject(error)
      }
    })
  }

  formatToolTip(tooltipTemplate: string, record: any): string {
    if (this.validateBrackets(tooltipTemplate)) {
      tooltipTemplate.replace(/\n/g, '<br>');
      this.substituteValues(tooltipTemplate);
    }

    return 'Please verify the tooltip template';
  }

  validateBrackets(tooltipTemplate: string): boolean {
    const strArr = tooltipTemplate.split('');
    let counter = 0;
    for (let i = 0, len = strArr.length; i < len; i++) {
      if (strArr[i] === "{") {
        counter++;
      } else if (strArr[i] === "}") {
        counter--;
      };
      if (counter < 0) {
        return false;
      };
    };
    if (counter === 0) {
      return true;
    };
    return false;
  };

  substituteValues(tooltipTemplate: string): any {

  };

  parseQuery(filtersConfig, filters, index): string {
    const filter = filtersConfig[index];
    let { query } = filter;
    let startIndex = query.indexOf('{');
    let endIndex = query.indexOf('}');

    if (query && startIndex > -1) {
      while (startIndex > -1) {
        let propertyName = query.substring(startIndex + 1, endIndex);
        let parentFilter = filters.find(filter => filter.valueProp === propertyName);
        if (parentFilter && parentFilter.value) {
          let re = new RegExp(`{${propertyName}}`);
          query = query.replace(re, '\'' + parentFilter.value + '\'');
        } else {
          break;
        }

        startIndex = query.indexOf('{');
        endIndex = query.indexOf('}');
      }
    }

    return query;
  }

  constructTooltip(tooltipMetrics: any, row: any, selectedMetricValue: any, reportType?: string, valueSuffix?: any): any {
    if (reportType === 'barChart') {
      let tooltip = []
      tooltipMetrics.forEach((metric: any) => {
        if (row[metric.value] !== undefined && row[metric.value] !== null) {
          tooltip.push(metric.valuePrefix + (isNaN(row[metric.value]) ? row[metric.value] : Number(row[metric.value])).toLocaleString() + metric.valueSuffix);
        }
      });
      return tooltip
    }
    else if(reportType === 'scatter') {
      let tooltip = []
      tooltipMetrics.forEach((metric: any) => {
        if (row[metric.value] !== undefined && row[metric.value] !== null) {
          tooltip.push(metric.valuePrefix + (isNaN(row[metric.value]) ? row[metric.value] : Number(row[metric.value])).toLocaleString() + metric.valueSuffix);
        }
      });
      selectedMetricValue.forEach((axis: any) => {
        if(axis?.value) {
          tooltip.push(axis.value + ': ' + (isNaN(row[axis.axis]) ? row[axis.axis] : Number(row[axis.axis])).toLocaleString() + valueSuffix)
        }
      })
      return tooltip
    }
    let tooltip = '';
    tooltipMetrics.forEach((metric: any) => {
      if (row[metric.value] !== undefined && row[metric.value] !== null) {
        const value = isNaN(row[metric.value]) ? row[metric.value] : Number(row[metric.value]);
        const formattedValue = value.toLocaleString();
        if(metric.valuePrefix.indexOf('_') > -1) {
          // console.log(metric.valuePrefix.split(/[_|\s]/))
          metric.valuePrefix = metric.valuePrefix.split('_').map(word => word[0]?.toUpperCase() + word?.substring(1).toLowerCase()).join(' ')
        }
        if (metric.value === selectedMetricValue) {
          tooltip += '<b><i>' + metric.valuePrefix.replace(/\n/g, '</br>') + formattedValue + metric.valueSuffix.replace(/\n/g, '</br>') + '</i></b>';
        } else {
          tooltip += metric.valuePrefix.replace(/\n/g, '</br>') + '<b>' + formattedValue + '</b>' + metric.valueSuffix.replace(/\n/g, '</br>');
        }
      }
    });
    return tooltip;
  }
}
