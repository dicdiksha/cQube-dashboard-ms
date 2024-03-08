import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reject } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { rbacConfig } from 'src/app/shared/components/rbac-dialog/rbacConfig';
import { configFiles } from 'src/app/core/config/configMapping';

import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { IMenuItem } from 'src/app/core/models/IMenuItem';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { formatNumberForReport, numberLabelFormatForReport } from 'src/app/utilities/NumberFomatter';
import { parseRbacFilter } from 'src/app/utilities/QueryBuilder';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardMenu: IDashboardMenu[] | any;
  // isNvsk = environment.config.toLocaleLowerCase() === 'nvsk';
  isNvsk = false;
  roles: any;
  rbacDetails: any;
 // tempPrashast: any = { "title": "PRASHAST", "navigationURL": "/prashast", "icon": "prashast.png", "tooltip": "Prashast is a pre assessment holistic screening tool for preliminary screening of students in schools to facilitate further referral to assessment camps for disability certification.", "metrics": [{ "value": "6.99L", "name": "Total Registered Users" },{ "value": "34.1L", "name": "Total Students" }] }
  constructor(private spinner: NgxSpinnerService,
	private readonly _commonService: CommonService, 
	private readonly _router: Router, 
	private readonly rbac: RbacService, 
	public router: Router,
	private _wrapperService: WrapperService) {
	this.roles = rbacConfig.roles.filter((role: any, index: any) => {
		return rbacConfig.roles[index - 1]?.['skipNext'] !== true
	  })
	  if(environment.config === 'VSK') {
		this.roles = this.roles.filter((role: any, index: any) => {
		  return role.value !== 0
		})
	  }
	  else {
		this.roles = this.roles.filter((role: any, index: any) => {
		  return role.value === 0
		})

	  }
	  //console.log('roles', this.roles)
    this.rbac.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails
    })
  }

  ngOnInit(): void {
    this.checkRbacLevel();
	this.onRoleSelect(this.roles[0]);
  }

  onRoleSelect(role: any) {
    this.rbac.setRbacDetails({ role: role.value, roleDetail: role })
    // this.router.navigate(['/rbac'])
  }

  /* onClickOfDashboardItem(cardInfo: IDashboardMenu | undefined): void {
    if (cardInfo) {
      this._router.navigate([cardInfo.navigationURL.trim()]);
    }
  } */

  onClickOfDashboardItem(cardInfo:any): void {
    if (cardInfo) {
      this._router.navigate([cardInfo.trim()]);
    }
  }

  checkRbacLevel() {
    const programIds = Object.keys(configFiles);
    const hierarchyLevels = {};
    programIds.forEach(key => {
      const programObject = configFiles[key];
      const reportNames = Object.keys(programObject);
      reportNames.forEach(reportName => {
        const reportObject = programObject[reportName];
        const filters = reportObject.filters;
        if (filters) {
          filters.forEach(element => {
            if (element.hierarchyLevel) {
              if (!hierarchyLevels[key]) {
                hierarchyLevels[key] = [];
              }
              if (!hierarchyLevels[key].includes(element.hierarchyLevel)) {
                hierarchyLevels[key].push(element.hierarchyLevel);
              }
            }
          });

        }
      });
    });

    this._commonService.getDashboardMetrics().subscribe(async (menuResult: any) => {
      this.dashboardMenu = [];
      let rbacDetails;
      let menuData = menuResult?.data
      for (let i = 0; i < menuData?.length; i++) {
          let menuToDisplay: IMenuItem | any = {};
          menuToDisplay.title = menuData[i].programName;
          menuToDisplay.navigationURL = menuData[i].navigationUrl;
          menuToDisplay.icon = menuData[i].imageUrl;
          menuToDisplay.tooltip = menuData[i].tooltip;
           this.getDashboardMetrics(configFiles[menuData[i].programID], this.rbacDetails)
               .then(d => {
                 menuToDisplay.metrics = d;
               });
          this.dashboardMenu.push(menuToDisplay);
        // if (hierarchyLevels[menuData[i].programID]?.includes(String(this.rbacDetails?.role))) {

        // }
      }
      //Prashast static changes
      //this.dashboardMenu.push(this.tempPrashast);
      //Prashast static changes
    })

  }

   getDashboardMetrics(programConfig: any, rbacDetails: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let metrics: any = []
        let reports = Object.keys(programConfig)
        for (let i = 0; i < reports.length; i++) {
          if (metrics.length >= 2) {
            break;
          }

          if (reports[i].indexOf('bignumber') > -1 || reports[i].indexOf('metrics') > -1) {
            let reportFilters = programConfig[reports[i]]?.filters
            let currentLevelFilter = programConfig[reports[i]]?.filters.filter(fil => fil.hierarchyLevel == Number(rbacDetails?.role))[0]
            // for (let j = 0; j < reportFilters.length; j++) {
            //   if (Number(reportFilters[j].hierarchyLevel) === Number(rbacDetails?.role)) {
            //     if (reportFilters[j]?.actions?.queries?.bigNumber) {
            //       let query = parseRbacFilter(reportFilters[j]?.actions?.queries?.bigNumber, rbacDetails)
            //       let res = await this._wrapperService.runQuery(query)
            //       if (res && res.length > 0) {
            //         let metricData = {
            //           value: res[0]?.[programConfig[reports[i]]?.options?.bigNumber?.property] !== null ? String(res[0]?.[programConfig[reports[i]]?.options?.bigNumber?.property]) + [programConfig[reports[i]]?.options?.bigNumber?.valueSuffix] : res[0]?.[programConfig[reports[i]]?.options?.bigNumber?.property],
            //           name: programConfig[reports[i]]?.options?.bigNumber?.title
            //         }
            //         if (metricData.value !== null && metricData !== undefined) {
            //           metrics.push(metricData)
            //         }
            //       }
            //     }
            //     else {
            //       let metricQueries = reportFilters[j]?.actions?.queries;
            //       let metricQueriesKeys = Object.keys(reportFilters[j]?.actions?.queries);
            //       for (let k = 0; k < metricQueriesKeys.length; k++) {
            //         if (metrics.length >= 2) {
            //           break;
            //         }
            //         else if (metricQueriesKeys[k].indexOf('bigNumber')) {
            //           let query = parseRbacFilter(metricQueries[metricQueriesKeys[k]], rbacDetails)
            //           let res = await this._wrapperService.runQuery(query)
            //           if (res && res.length > 0) {
            //             let metricData = {
            //               value: res[0]?.[programConfig[reports[i]]?.options?.bigNumber?.property] !== null ? String(res[0]?.[programConfig[reports[i]]?.options?.bigNumber?.property]) + [programConfig[reports[i]]?.options?.bigNumber?.valueSuffix] : res[0]?.[programConfig[reports[i]]?.options?.bigNumber?.property],
            //               name: programConfig[reports[i]]?.options?.bigNumber?.title
            //             }
            //             if (metricData.value !== null && metricData !== undefined) {
            //               metrics.push(metricData)
            //             }
            //           }
            //         }
            //       }
            //     }

            //   }
            // }
            if (currentLevelFilter !== undefined) {
              let metricQueries = currentLevelFilter?.actions?.queries;
              let metricQueriesKeys = Object.keys(metricQueries);
              for (let k = 0; k < metricQueriesKeys?.length; k++) {
                if (metrics.length >= 2) {
                  break;
                }
                else if (metricQueriesKeys[k].indexOf('bigNumber') > -1) {
                  let query = parseRbacFilter(metricQueries[metricQueriesKeys[k]], rbacDetails);
                  let bigNumberOptions = Array.isArray(programConfig[reports[i]]?.options?.bigNumber) ? programConfig[reports[i]]?.options?.bigNumber[rbacDetails.role] : programConfig[reports[i]]?.options?.bigNumber;
                  if (query === "" || isNaN(Number(query))) {
                    let res = await this._wrapperService.runQuery(query)
                    if (res && res.length > 0) {
                      let metricData = {
                        value: Array.isArray(bigNumberOptions?.property) ? String(formatNumberForReport(res[0]?.[bigNumberOptions?.property[k]])) + [bigNumberOptions?.valueSuffix[k]] : String(formatNumberForReport(res[0]?.[bigNumberOptions?.property])) + [bigNumberOptions?.valueSuffix],
                        name: Array.isArray(bigNumberOptions?.title) ? bigNumberOptions?.title[k] : bigNumberOptions?.title
                      }
                      if((Array.isArray(bigNumberOptions?.property) ? res?.[0]?.[bigNumberOptions?.property[k]] : res?.[0]?.[bigNumberOptions?.property]) === null) {
                        metricData.value = Array.isArray(bigNumberOptions?.valueSuffix) ? '0' + bigNumberOptions?.valueSuffix[k] : '0' + bigNumberOptions?.valueSuffix
                      } 
                      if (metricData.value !== null && metricData !== undefined) {
                        metrics.push(metricData)
                        // console.log(metricData.value)
                      }
                    }
                  } else {
                    const formatter = bigNumberOptions?.formatter[k] ? bigNumberOptions?.formatter[k] : bigNumberOptions?.formatter;
                    metrics.push({
                      value: !isNaN(metricQueries[metricQueriesKeys[k]]) ? formatNumberForReport(metricQueries[metricQueriesKeys[k]], formatter) : metricQueries[metricQueriesKeys[k]],
                      name: bigNumberOptions?.title[k]
                    });
                  }
                }
              }
            }

          }
        }
        resolve(metrics)
      } catch (error) {
        reject(error)
      }
    })
  }

}
