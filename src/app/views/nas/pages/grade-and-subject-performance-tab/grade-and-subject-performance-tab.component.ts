import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { config } from '../../config/nas_config';
import { GradeAndSubjectPerformanceComponent } from './reports/grade-and-subject-performance/grade-and-subject-performance.component';

@Component({
    selector: 'app-grade-and-subject-performance-tab',
    templateUrl: './grade-and-subject-performance-tab.component.html',
    styleUrls: ['./grade-and-subject-performance-tab.component.scss']
})
export class GradeAndSubjectPerformanceTabComponent implements OnInit, AfterViewInit {

    bigNumberReports: any = {};
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
    tabLabel: any = 'Grade & Subject Performance'
@ViewChild('gradeAndSubjectPerformance') gradeAndSubjectPerformance: GradeAndSubjectPerformanceComponent;
        
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
        this.gradeAndSubjectPerformance?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id} }) });
        }
    if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
        let endDate = new Date();
        let days = endDate.getDate() - this.defaultSelectedDays;
        let startDate = new Date();
        startDate.setDate(days);
        this.gradeAndSubjectPerformance?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
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
    this.gradeAndSubjectPerformance?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id} }) });
        }

    timeSeriesUpdated(event: any): void {
    this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
    this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
    if (event?.startDate !== null && event?.endDate !== null) {
        this.reportsData = [];
        this.gradeAndSubjectPerformance?.getReportData({timeSeriesValues: {startDate: this.startDate, endDate: this.endDate}});
        }
    }
}
        