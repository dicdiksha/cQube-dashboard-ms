import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { reject } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { StateCodes, stateNames } from 'src/app/core/config/StateCodes';
import { configFiles } from 'src/app/core/config/configMapping';

import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { IMenuItem } from 'src/app/core/models/IMenuItem';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
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

  mySubscription: any;

  dashboardMenu: IDashboardMenu[] | any;
  // isNvsk = environment.config.toLocaleLowerCase() === 'nvsk';
  isNvsk = false;
  rbacDetails: any;
  constructor(private spinner: NgxSpinnerService, private readonly _commonService: CommonService, private readonly _router: Router, private readonly rbac: RbacService, private _wrapperService: WrapperService, private _authService: AuthenticationService, private _rbacService: RbacService) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this._router.navigated = false;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('token') === null) {
      let data = {
        username: environment.guestUsername,
        password: environment.guestPassword
      }
      let response = await this._authService.login(data).toPromise();
      if (response && response['access_token']) {

        localStorage.clear()
        const token = response['access_token']
        const refreshToken = response['refresh_token']
        const programAccess = response['program_access']
        const userRoles = response['roles']
        const userId = response['userId']
        localStorage.setItem('user_id', userId)
        localStorage.setItem('user_roles', JSON.stringify(userRoles))
        localStorage.setItem('program_access', JSON.stringify(programAccess))
        localStorage.setItem('token', token)
        localStorage.setItem('refresh_token', refreshToken)
        this._authService.startRefreshTokenTimer();
        this._authService.updateSideNav(true);
        let preferences = {
          role: environment.config === 'NVSK' ? 0 : 1
        }
        this.setStateDetails(preferences)
      }
    }
    this.rbac.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails
    })
    this.checkRbacLevel();
  }

  onClickOfDashboardItem(cardInfo: IDashboardMenu | undefined): void {
    if (cardInfo) {
      this._router.navigate([cardInfo.navigationURL.trim()]);
    }
  }

  async checkRbacLevel() {
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
    let promises = []
    this.spinner.show();
    this.dashboardMenu = [];
    let promise = await this._commonService.getDashboardMetrics().toPromise()
    let menuData = promise['data']
    for (let i = 0; i < menuData?.length; i++) {
      if (hierarchyLevels[menuData[i].programID]?.includes(String(this.rbacDetails?.role))) {

        let menuToDisplay: IMenuItem | any = {};
        menuToDisplay.title = menuData[i].programName;
        menuToDisplay.navigationURL = menuData[i].navigationUrl;
        menuToDisplay.icon = menuData[i].imageUrl;
        menuToDisplay.tooltip = menuData[i].tooltip;
        let results: any = await this.getDashboardMetrics(configFiles[menuData[i].programID], this.rbacDetails)
        promises.push(results)
        menuToDisplay.metrics = results
        this.dashboardMenu.push(menuToDisplay);
      }
    }
    // Promise.allSettled(promises).then(() => {
    //   this.spinner.hide();
    // })
    this.spinner.hide();
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
              console.log("cvbn:", { metricQueriesKeys, currentLevelFilter, metricQueries })
              for (let k = 0; k < metricQueriesKeys?.length; k++) {
                if (metrics.length >= 2) {
                  break;
                }
                else if (metricQueriesKeys[k].indexOf('bigNumber') > -1) {
                  let query = parseRbacFilter(metricQueries[metricQueriesKeys[k]], rbacDetails);
                  if (query === "" || isNaN(Number(query))) {
                    let res = await this._wrapperService.runQuery(query)
                    if (res && res.length > 0) {
                      let metricData = {
                        value: Array.isArray(programConfig[reports[i]]?.options?.bigNumber?.property) ? String(formatNumberForReport(res[0]?.[programConfig[reports[i]]?.options?.bigNumber?.property[k]])) + [programConfig[reports[i]]?.options?.bigNumber?.valueSuffix[k]] : String(formatNumberForReport(res[0]?.[programConfig[reports[i]]?.options?.bigNumber?.property])) + [programConfig[reports[i]]?.options?.bigNumber?.valueSuffix],
                        name: Array.isArray(programConfig[reports[i]]?.options?.bigNumber?.title) ? programConfig[reports[i]]?.options?.bigNumber?.title[k] : programConfig[reports[i]]?.options?.bigNumber?.title
                      }
                      if((Array.isArray(programConfig[reports[i]]?.options?.bigNumber?.property) ? res?.[0]?.[programConfig[reports[i]]?.options?.bigNumber?.property[k]] : res?.[0]?.[programConfig[reports[i]]?.options?.bigNumber?.property]) === null) {
                        metricData.value = Array.isArray(programConfig[reports[i]]?.options?.bigNumber?.valueSuffix) ? '0' + programConfig[reports[i]]?.options?.bigNumber?.valueSuffix[k] : '0' + programConfig[reports[i]]?.options?.bigNumber?.valueSuffix
                      } 
                      if (metricData.value !== null && metricData !== undefined) {
                        metrics.push(metricData)
                        // console.log(metricData.value)
                      }
                    }
                  } else {
                    const formatter = programConfig[reports[i]]?.options?.bigNumber?.formatter[k] ? programConfig[reports[i]]?.options?.bigNumber?.formatter[k] : programConfig[reports[i]]?.options?.bigNumber?.formatter;
                    metrics.push({
                      value: !isNaN(metricQueries[metricQueriesKeys[k]]) ? formatNumberForReport(metricQueries[metricQueriesKeys[k]], formatter) : metricQueries[metricQueriesKeys[k]],
                      name: programConfig[reports[i]]?.options?.bigNumber?.title[k]
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

  setStateDetails(details) {
    if (environment.config === 'VSK') {
      let state_id, stateName;
      if (environment.stateCode) {
        state_id = StateCodes.indexOf(environment.stateCode)
        details.state = state_id
        let names: any = stateNames;
        names.every((state: any) => {
          if (state.stateCode == environment.stateCode) {
            stateName = state.stateName;
            return false;
          }
          return true;
        });
      }
      this._rbacService.setRbacDetails({
        ...details,
        state_name: stateName,
      });
    }
    else {
      this._rbacService.setRbacDetails({
        ...details
      });
    }

  }

  ngOnDestroy() {
    this.mySubscription?.unsubscribe();
  }

}
