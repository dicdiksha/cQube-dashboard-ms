import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { config } from '../../config/nishtha_config';
import { PotentialBaseCertificatesComponent } from './reports/potential-base-certificates/potential-base-certificates.component';
import { PotentialBaseComponent } from './reports/potential-base/potential-base.component';
import { environment } from 'src/environments/environment';
import { PotentialBaseNvskComponent } from './reports/potential-base-nvsk/potential-base-nvsk.component';

@Component({
    selector: 'app-potential-base-tab',
    templateUrl: './potential-base-tab.component.html',
    styleUrls: ['./potential-base-tab.component.scss']
})
export class PotentialBaseTabComponent implements OnInit, AfterViewInit {

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
    matLabel='% against Potential Base';
    NVSK = true;
    
@ViewChild('potentialBase') potentialBase: PotentialBaseComponent;
@ViewChild('potentialBaseCertificates') potentialBaseCertificates: PotentialBaseCertificatesComponent;
@ViewChild('potentialBaseNVSK') potentialBaseNVSK: PotentialBaseNvskComponent;
        
constructor(private _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
        this.rbacDetails = rbacDetails;
    });

    if (environment.config !== 'NVSK') {
        this.NVSK = false
    }
}

    async ngOnInit(): Promise<void> {
    // this.renderReports();
    }

    async ngAfterViewInit(): Promise<void> {
    if (this.NVSK) {
        this.filters = await this._wrapperService.constructCommonFilters(config.filters, this.matLabel);
        this.potentialBaseNVSK?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    } else {
        this.potentialBase?.getReportData({ filterValues: [] });
        this.potentialBaseCertificates?.getReportData({ filterValues: [] });
    }

    if (this.startDate === undefined && this.endDate === undefined && this.hasTimeSeriesFilters) {
        let endDate = new Date();
        let days = endDate.getDate() - this.defaultSelectedDays;
        let startDate = new Date();
        startDate.setDate(days);
        this.potentialBase?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
        this.potentialBaseCertificates?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
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
    if(this.NVSK) {
        this.potentialBaseNVSK?.getReportData({ filterValues: this.filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    }
    else {
        this.potentialBaseCertificates?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
        this.potentialBase?.getReportData({ filterValues: filters.map((filter) => { return { ...filter, columnName: filter.valueProp, filterType: filter.id } }) });
    }
        }

    timeSeriesUpdated(event: any): void {
    this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
    this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
    if (event?.startDate !== null && event?.endDate !== null) {
        this.reportsData = [];
        this.potentialBase?.getReportData({timeSeriesValues: {startDate: this.startDate, endDate: this.endDate}});
        this.potentialBaseCertificates?.getReportData({timeSeriesValues: {startDate: this.startDate, endDate: this.endDate}});
        }
    }
}
        