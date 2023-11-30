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
    this.bigNumberMetrics = [{ "valueSuffix": "", "reportName": "Total Registered Users", "averagePercentage": 699041 }, 
    { "valueSuffix": "", "reportName": "Total Students", "averagePercentage": 3418908 }, 
    { "valueSuffix": "", "reportName": "Total Schools", "averagePercentage": 259611 }, 
    { "valueSuffix": "", "reportName": "Total Teachers", "averagePercentage": 429170 },
    { "valueSuffix": "", "reportName": "Total Principal/Headmaster", "averagePercentage": 188249 }, 
    { "valueSuffix": "", "reportName": "Total Special Educators", "averagePercentage": 15683 }, 
    { "valueSuffix": "", "reportName": "Total Survey Part-1", "averagePercentage": 2051823 }, 
    { "valueSuffix": "", "reportName": "Total Survey Part-2", "averagePercentage": 1675259 }, ]

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
