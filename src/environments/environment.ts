// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  google_analytics_tracking_id: "UA-260554959-3",
  // apiURL: 'https://qr.staging.cqube.samagra.io',
  apiURL: 'http://localhost:3008',
  // 'apiURL': 'https://vidyaskendra.diksha.gov.in/api/queryBuilder',
  stateCode: "NA",
  numberFormat: {
    reports: {
      locale: 'en-IN',
      format: 'short'
    }
  },
  config: "NVSK",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
