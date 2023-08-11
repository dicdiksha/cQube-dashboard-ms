import { Component, OnInit } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { config } from 'src/app/views/prashast/config/prashast_config';

@Component({
  selector: 'app-prashast',
  templateUrl: './prashast.component.html',
  styleUrls: ['./prashast.component.scss']
})
export class PrashastComponent implements OnInit {
  rbacDetails: any;
  bigNumberMetrics: any = [];

  constructor(private _rbacService: RbacService) { 
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
    this.bigNumberMetrics = [{ "valueSuffix": "", "reportName": "Total Registered Users", "averagePercentage": 511572 }, 
    { "valueSuffix": "", "reportName": "Total Students", "averagePercentage": 2065848 }, 
    { "valueSuffix": "", "reportName": "Total Schools", "averagePercentage": 187568 }, 
    { "valueSuffix": "", "reportName": "Total Teachers", "averagePercentage": 324822 },
    { "valueSuffix": "", "reportName": "Total Principal/Headmaster", "averagePercentage": 135950 }, 
    { "valueSuffix": "", "reportName": "Total Special Educators", "averagePercentage": 11815 }, 
    { "valueSuffix": "", "reportName": "Total Survey Part-1", "averagePercentage": 1043013 }, 
    { "valueSuffix": "", "reportName": "Total Survey Part-2", "averagePercentage": 213699 }, ]

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

}
