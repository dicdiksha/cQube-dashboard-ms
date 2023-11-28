import { Component, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { NasStateWisePerformanceComponent } from './reports/nas-state-wise-performance/nas-state-wise-performance.component';
import { config} from '../../config/nas_config'

@Component({
  selector: 'app-nas-state-wise-performance-tab',
  templateUrl: './nas-state-wise-performance-tab.component.html',
  styleUrls: ['./nas-state-wise-performance-tab.component.scss']
})
export class NasStateWisePerformanceTabComponent implements OnInit {

  minYear: any;
  maxYear: any;
  minMonth: any;
  maxMonth: any;
  academicYear: any = [];
  months: any = [];
  filters: any;
  reportsToBeShown: any = [];
  rbacDetails: any;
  reportsData: any = [];
  startDate: any;
  endDate: any;
  defaultSelectedDays: any;
  hasTimeSeriesFilters: boolean = false;
  hasCommonFilters: boolean = true;
  tabLabel: any = 'State Wise Performance';
  bigNumberMetrics: any = [];

@ViewChild('nasstatewiseperformance') nasstatewiseperformance: NasStateWisePerformanceComponent;
      
constructor(private _wrapperService: WrapperService, private _rbacService: RbacService) {
  this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
  })
  }

  async ngOnInit(): Promise<void> {
  // this.renderReports();
  }

  async ngAfterViewInit(): Promise<void> {
  if (this.hasCommonFilters) {
      this.filters = await this._wrapperService.constructCommonFilters(config.filters, this.tabLabel);
      this.filters = await this._wrapperService.updateDependantFilters(this.filters, 0);
      this.nasstatewiseperformance?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id} }) });
      }
  if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
      let endDate = new Date();
      let days = endDate.getDate() - this.defaultSelectedDays;
      let startDate = new Date();
      startDate.setDate(days);
      this.nasstatewiseperformance?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
      }
  }


  checkReport(key: string, reportType: string): Boolean {
  let reportConfig = config;
  let flag = false;
  reportConfig[key]?.filters?.forEach((filter: any) => {
      if (Number(filter.hierarchyLevel) === Number(this.rbacDetails?.role) && Object.keys(filter?.actions?.queries).includes(reportType)) {
      flag = true
      }
  })
  return flag
  }

  csvDownload(csvData: any) {
  if (csvData) {
      this.reportsData.push(csvData)
  }
  }

  async filtersUpdated(filters: any) {
    let updatedIndex = 0;
    for (let index = 0; index < filters.length; index++) {
        if(filters[index].isUpdated){
            updatedIndex = index;
            break;
        }
    };
    this.filters = await this._wrapperService.updateDependantFilters(this.filters, updatedIndex);

  this.reportsData = [];
  this.nasstatewiseperformance?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id} }) });
      }

  timeSeriesUpdated(event: any): void {
  this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
  this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
  if (event?.startDate !== null && event?.endDate !== null) {
      this.reportsData = [];
      this.nasstatewiseperformance?.getReportData({timeSeriesValues: {startDate: this.startDate, endDate: this.endDate}});
      }
  }

  importBigNumberMetrics(bigNumberMetric: any) {
      this.bigNumberMetrics[bigNumberMetric.ind] = bigNumberMetric.data
  }}
