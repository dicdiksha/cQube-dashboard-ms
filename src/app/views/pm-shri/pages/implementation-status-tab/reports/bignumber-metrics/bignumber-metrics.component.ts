import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/pm-shri/config/pm_shri_config';

@Component({
  selector: 'app-bignumber-metrics',
  templateUrl: './bignumber-metrics.component.html',
  styleUrls: ['./bignumber-metrics.component.scss']
})
export class BignumberMetricsComponent implements OnInit {
  reportName: string = 'pmShri_metrics';
  filters: any = [];
  levels: any;
  reportData: any = [];
  title: string = '-------to be filled-------'
  selectedYear: any;
  selectedMonth: any;
  startDate: any;
  endDate: any;
  config: any;
  compareDateRange: any = 30;
  filterIndex: any;
  rbacDetails: any;

  @Output() exportReportData = new EventEmitter<any>();

  constructor(private readonly _dataService: DataService, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
    this.getReportData();
  }

  getReportData(values?: any): void {
    let { filterValues, timeSeriesValues } = values ?? {};
    this.startDate = timeSeriesValues?.startDate;
    this.endDate = timeSeriesValues?.endDate;
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;
    let currentLevel;

    if (this.rbacDetails?.role !== null && this.rbacDetails.role !== undefined) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = { ...filter?.actions?.queries }
          currentLevel = filter?.actions?.level;
          Object.keys(queries).forEach((key) => {
            queries[key] = parseRbacFilter(queries[key], this.rbacDetails)
          });
          return false
        }
        return true
      })
    }
    Object.keys(queries).forEach(async (key: any, index: any) => {
      if (key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        let days = endDate.getDate() - this.compareDateRange;
        let startDate = new Date();
        startDate.setDate(days)
        onLoadQuery = parseTimeSeriesQuery(queries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

      if (query && key.indexOf('bigNumber') > -1) {
        let metricOptions = {
          bigNumber: {
            title: Array.isArray(options?.bigNumber?.title) ? options?.bigNumber?.title?.[index] : options?.bigNumber?.title,
            property: Array.isArray(options?.bigNumber?.property) ? options?.bigNumber?.property?.[index] : options?.bigNumber?.property,
            valueSuffix: Array.isArray(options?.bigNumber?.valueSuffix) ? options?.bigNumber?.valueSuffix?.[index] : options?.bigNumber?.valueSuffix,
            formatter: Array.isArray(options?.bigNumber?.formatter) ? options?.bigNumber?.formatter?.[index] : options?.bigNumber?.formatter,
          }
        }
        let metricData = await this._dataService.getBigNumberReportData(query, metricOptions, 'averagePercentage', this.reportData);
        metricData = {
          ...metricData,
        }
        this.exportReportData.emit({data: metricData, ind: index})
      }
    })
  }
}
