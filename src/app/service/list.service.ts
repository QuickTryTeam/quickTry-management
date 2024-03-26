import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { ApiResponse, WorkshopsList, WorkshopsListSearch } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getWorkshopsForActive(): Observable<ApiResponse<WorkshopsList>> {
    const params = new HttpParams()
      .set('path', 'lov/workshopList/form')
      
    return this.http.get<ApiResponse<WorkshopsList>>(environment.apiUrl, { params });
  }
  
  getWorkshopsForCertificate(): Observable<ApiResponse<WorkshopsList>> {
    const params = new HttpParams()
      .set('path', 'lov/workshopList/certificate')
      
    return this.http.get<ApiResponse<WorkshopsList>>(environment.apiUrl, { params });
  }
}
