
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { config } from './config/nas_apex_config';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-nas',
    templateUrl: './nas-apex.component.html',
    styleUrls: ['./nas-apex.component.scss']
})
export class NasComponent implements OnInit, AfterViewInit {
    loadTabs = false;
    rbacDetails: any;
    tabIndex;
    selectedTabLabel;
    tabs: any = [];
    programName: any = 'nas-apex';
    bigNumberMetrics: any = [];
    NVSK: boolean = true;
    url:string = 'https://vskdev-apex.diksha.gov.in/ords/r/vskdev/nas';
    urlSafe: SafeResourceUrl;
	@ViewChild('target') private myTarget:ElementRef;

    constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private _rbacService: RbacService, private _commonService: CommonService) {
        this.route.queryParams.subscribe((param: any) => {
            this.tabIndex = param.tab ? Number(param.tab) : 0;
        })
        this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
            this.rbacDetails = rbacDetails;
        })
        let allTabs = [...Object.keys(config)]
        allTabs.forEach((tab: any) => {
            config?.[tab]?.filters?.every((filter) => {
                if ((Number(filter?.hierarchyLevel) === this.rbacDetails?.role) || this.rbacDetails?.role === 0) {
                    if (!(this.tabs.includes(config?.[tab]?.label))) {
                        this.tabs.push(config?.[tab]?.label)
                    }
                    return false
                }
                return true
            })
        })
        if(environment.config === 'VSK') {
            this.NVSK = false;
        }
    }

    ngOnInit(): void {
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        this._commonService.getMetaData(this.programName).subscribe()
    }

    ngAfterViewInit(): void {
		this._commonService.scrollInto(this.myTarget.nativeElement);
        setTimeout(() => {
            this.selectedTabLabel = this.tabs.length > 0 ? this.tabs[0] : undefined
        });
    }

    onTabChanged($event: any): void {
        this.selectedTabLabel = $event?.tab?.textLabel;
        this.tabIndex = $event.index;
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
            console.log('resize');
        }, 100);
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

    importBigNumberMetrics(bigNumberMetric: any) {
        this.bigNumberMetrics[bigNumberMetric.ind] = bigNumberMetric.data
    }

}
