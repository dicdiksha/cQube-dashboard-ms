import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseType } from 'src/app/core/models/IResponseType';
import { environment } from 'src/environments/environment';
import { programFolderNames, stateProgramsFolderNames } from '../../config/configMapping';
import { IReportDataPayload } from '../../models/IReportDataPayload';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  

  constructor(private readonly _http: HttpClient) { }
  
  getReportData(data: IReportDataPayload): Observable<ResponseType<any>> {
    return this._http.post<ResponseType<any>>(`${environment.apiURL}/common/getReportData`, data);
  }

  getReportDataNew(query: string): Observable<ResponseType<any>> {
    // return this._http.get<ResponseType<any>>(`http://localhost:3005/api/query?sql=${query}`);
    return this._http.post<ResponseType<any>>(`${environment.apiURL}/query`, {"query": query});
  }
  
  getDashboardMetrics(): Observable<ResponseType<any>> {
    return this._http.get<ResponseType<any>>(`${environment.apiURL}/metric`);
    // return this._http.get<ResponseType<any>>('../../../assets/data/mock/metric.json');
  } 

  getGenrateToken(): Observable<ResponseType<any>> {
    return this._http.get<ResponseType<any>>(`${environment.apiURL}/generatejwt`);
  } 

  getMetaData(programName:any): Observable<ResponseType<any>> {
    let ProgramFolderName = stateProgramsFolderNames[programName] === '' ? programFolderNames[programName] : stateProgramsFolderNames[programName]
    return this._http.get<ResponseType<any>>(`${environment.apiURL}/lastmodified?ProgramName=${ProgramFolderName}`);
  }
  
  scrollInto(el:any){
	setTimeout(()=>{
		el.scrollIntoView({behavior:'smooth', block:'center', inline:'nearest'})
	},5000)
  }

}
