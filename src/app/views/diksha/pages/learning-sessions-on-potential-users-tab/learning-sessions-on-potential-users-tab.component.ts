import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { config } from '../../config/diksha_config';
import { LearningSessionsOnPotentialUsersComponent } from './reports/learning-sessions-on-potential-users/learning-sessions-on-potential-users.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-learning-sessions-on-potential-users-tab',
    templateUrl: './learning-sessions-on-potential-users-tab.component.html',
    styleUrls: ['./learning-sessions-on-potential-users-tab.component.scss']
})
export class LearningSessionsOnPotentialUsersTabComponent implements OnInit, AfterViewInit {

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
    NVSK:boolean = true;
    matLabel:any ="Learning Sessions per Capita"
    @ViewChild('learningSessionsOnPotentialUsers') learningSessionsOnPotentialUsers: LearningSessionsOnPotentialUsersComponent;

    constructor(private _wrapperService: WrapperService, private _rbacService: RbacService) {
        this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
            this.rbacDetails = rbacDetails;
        })
        if(environment.config === 'VSK') {
            this.NVSK = false;
        }
    }

    async ngOnInit(): Promise<void> {
        // this.renderReports();
    }

    async ngAfterViewInit(): Promise<void> {
        if (this.hasCommonFilters) {
            this.filters = await this._wrapperService.constructCommonFilters(config.filters, this.matLabel);
            this.learningSessionsOnPotentialUsers?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
        }
        if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
            let endDate = new Date();
            let days = endDate.getDate() - this.defaultSelectedDays;
            let startDate = new Date();
            startDate.setDate(days);
            this.learningSessionsOnPotentialUsers?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
        }
    }

    checkReport(key: string, reportType: string, alterReportType?: string): Boolean {
        let reportConfig = config;
        let flag = false;
        reportConfig[key]?.filters?.forEach((filter: any) => {
            if (Number(filter.hierarchyLevel) === Number(this.rbacDetails?.role) && (Object.keys(filter?.actions?.queries).includes(reportType) || Object.keys(filter?.actions?.queries).includes(alterReportType))) {
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
        this.learningSessionsOnPotentialUsers?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    }

    timeSeriesUpdated(event: any): void {
        this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
        this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
        if (event?.startDate !== null && event?.endDate !== null) {
            this.reportsData = [];
            this.learningSessionsOnPotentialUsers?.getReportData({ timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
        }
    }
}
