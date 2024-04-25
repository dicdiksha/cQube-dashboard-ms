import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { config } from 'src/app/views/prashast/config/prashast_config';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-prashast',
  templateUrl: './prashast.component.html',
  styleUrls: ['./prashast.component.scss']
  
})
export class PrashastComponent implements OnInit, AfterViewInit {
  rbacDetails: any;
  bigNumberMetrics: any = [];
  programName: any = 'prashast';
  @ViewChild('target') private myTarget:ElementRef;
  url:string = 'https://vskdev-apex.diksha.gov.in/ords/r/vskdev/prashast';
  urlSafe: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private _rbacService: RbacService, private _commonService: CommonService) { 
    
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
        this.rbacDetails = rbacDetails;
    })
    
    }

    ngOnInit(): void {
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        this._commonService.getMetaData(this.programName).subscribe()
    }

    ngAfterViewInit(): void {
		this._commonService.scrollInto(this.myTarget.nativeElement);
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
