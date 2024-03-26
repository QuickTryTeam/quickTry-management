import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchWorkshop, UpdateWorkshop, Workshop, WorkshopDetail, WorkshopList } from '../interface/workshop';
import { ApiResponse } from '../interface/common';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  findWorkshops(searchData: SearchWorkshop): Observable<ApiResponse<Workshop[]>> {
    const payload = {
      workshopName: searchData.workshop
    };
      
    return this.http.post<ApiResponse<Workshop[]>>(environment.apiUrl + '?path=find/workshops', JSON.stringify(payload));
  }

  getIncomingWorkshops(): Observable<ApiResponse<WorkshopDetail[]>> {
    const params = new HttpParams()
      .set('path', 'incoming-workshops')
      
    return this.http.get<ApiResponse<WorkshopDetail[]>>(environment.apiUrl, { params });
  }

  getWorkshopAndDetail(workshopId: string): Observable<ApiResponse<Workshop[]>> {
    const params = new HttpParams()
      .set('path', 'workshop-detail')
      .set('workshopId', workshopId)
      
    return this.http.get<ApiResponse<Workshop[]>>(environment.apiUrl, { params });
  }

  updateWorkshop(updateWorkshop: UpdateWorkshop): Observable<any> {
    const payload = updateWorkshop

    return this.http.post<any>(environment.apiUrl + '?path=upsert/workshops', JSON.stringify(payload));
  }

  deleteWorkshop(workshopId: string): Observable<any> {
    const params = new HttpParams()
      .set('path', 'delete/workshop')
      .set('workshopId', workshopId)

    return this.http.get<any>(environment.apiUrl, { params });
  }
}
