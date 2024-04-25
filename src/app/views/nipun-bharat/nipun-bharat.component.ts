import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { config } from './config/nipun_bharat_config';

@Component({
  selector: 'app-nipun-bharat',
  templateUrl: './nipun-bharat.component.html',
  styleUrls: ['./nipun-bharat.component.scss']
})
export class NipunBharatComponent implements OnInit, AfterViewInit {

  loadTabs = false;
  rbacDetails: any;
  tabIndex;
  selectedTabLabel;
  tabs: any = [];
  programName: any = 'nipunBharat'
  bigNumberMetrics: any = [];
  @ViewChild('target') private myTarget:ElementRef;

  constructor(private route: ActivatedRoute, private _rbacService: RbacService, private _commonService: CommonService) {
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
  }

  ngOnInit(): void {
    this._commonService.getMetaData(this.programName).subscribe()
  }

  ngAfterViewInit(): void {
	this._commonService.scrollInto(this.myTarget.nativeElement);
    setTimeout(() => {
      // making textbook status tab as default
      //this.selectedTabLabel = this.tabs.length > 0 ? this.tabs[0] : undefined
      this.selectedTabLabel = this.tabs.length > 0 ? this.tabs[2] : undefined
    });
  }

  onTabChanged($event: any): void {
    this.selectedTabLabel = $event?.tab?.textLabel;
    this.tabIndex = $event.index;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
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

  getMetricsArray() {
      return this.bigNumberMetrics.filter((data) => {
        return data.averagePercentage !== null || data.averagePercentage !== undefined
      }) 
    }

}

