import { Component, OnInit ,ViewChild} from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { config } from '../../config/nipun_bharat_config';
import { DetailedStatusComponent } from './reports/detailed-status/detailed-status.component';


@Component({
  selector: 'app-detailed-status-tab',
  templateUrl: './detailed-status-tab.component.html',
  styleUrls: ['./detailed-status-tab.component.scss']
})
export class DetailedStatusTabComponent implements OnInit {

  
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
  tabLabel: any = 'Detailed Status';
  bigNumberMetrics: any = [];

 

  @ViewChild('detailedStatus') detailedStatus: DetailedStatusComponent;

  constructor(private _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.hasCommonFilters) {
      this.filters = await this._wrapperService.constructCommonFilters(config.filters, this.tabLabel ,undefined,undefined,true);
      this.detailedStatus?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });

    }
    if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
      let endDate = new Date();
      let days = endDate.getDate() - this.defaultSelectedDays;
      let startDate = new Date();
      startDate.setDate(days);
      this.detailedStatus?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });

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

  filtersUpdated(filters: any) {
    this.reportsData = [];
    this.detailedStatus?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });

  }
  timeSeriesUpdated(event: any): void {
    this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
    this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
    if (event?.startDate !== null && event?.endDate !== null) {
      this.reportsData = [];
      this.detailedStatus?.getReportData({ timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });

    }
  }

  importBigNumberMetrics(bigNumberMetric: any) {
    this.bigNumberMetrics[bigNumberMetric.ind] = bigNumberMetric.data
  }


}
