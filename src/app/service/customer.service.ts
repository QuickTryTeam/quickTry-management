import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApproveStatus, UpdateCustomer, Customer, SearchCustomer } from '../interface/customer';
import { Observable, of } from 'rxjs';
import { environment } from '../environment/environment';
import { ApiResponse } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // Wait to deprecated
  findAllCustomers(searchData: SearchCustomer): Observable<ApiResponse<Customer[]>> {
    const payload = {
      workshopName: searchData.workshop,
      nickname: searchData.nickname,
      status: searchData.status,
      workshopDetailId: searchData.workshopDetailId
    };

    return this.http.post<ApiResponse<Customer[]>>(environment.apiUrl + '?path=find/customers', JSON.stringify(payload));
  }

  findPendingCustomers(): Observable<ApiResponse<Customer>> {
    const params = new HttpParams()
      .set('path', 'core-inquiry-service/pendingCustomers')
      
    return this.http.get<ApiResponse<Customer>>(environment.apiUrl, { params });
  }

  updateStatus(approveStatus: ApproveStatus): Observable<ApiResponse<ApproveStatus>> {
    const payload = {
      registerId: approveStatus.registerId,
      approval: approveStatus.approval,
      status: approveStatus.status,
      type: approveStatus.type
    };

    return this.http.post<ApiResponse<ApproveStatus>>(environment.apiUrl + '?path=update/register/status', JSON.stringify(payload));
  }

  findCustomer(id: string): Observable<ApiResponse<Customer>> {
    const params = new HttpParams()
      .set('path', 'customer')
      .set('id', id)
      
    return this.http.get<ApiResponse<Customer>>(environment.apiUrl, { params });
  }
  
  updateCustomer(updateCustomer: UpdateCustomer[]): Observable<ApiResponse<any>> {
    const payload = updateCustomer;

    return this.http.post<ApiResponse<any>>(environment.apiUrl + '?path=patch/customers', JSON.stringify(payload));
  }
}
