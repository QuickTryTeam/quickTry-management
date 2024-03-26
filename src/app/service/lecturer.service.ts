import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lecturer, SearchLecturer, UpdateLecturer } from '../interface/lecturer';
import { ApiResponse } from '../interface/common';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  constructor(private http: HttpClient) { }

  findAllLecturers(searchData: SearchLecturer): Observable<ApiResponse<Lecturer[]>> {
    const payload = {
      career: searchData.career,
      nickname: searchData.nickname
    };
      
    return this.http.post<ApiResponse<Lecturer[]>>(environment.apiUrl + '?path=find/lecturers', JSON.stringify(payload));
  }

  findLecturer(lecturer_id: string): Observable<ApiResponse<Lecturer>> {
    const params = new HttpParams()
      .set('path', 'lecturer')
      .set('lecturer_id', lecturer_id)
      
    return this.http.get<ApiResponse<Lecturer>>(environment.apiUrl, { params });
  }

  updateLecturer(lecturer: UpdateLecturer[]): Observable<ApiResponse<any>> {
    const payload = lecturer;

    return this.http.post<ApiResponse<any>>(environment.apiUrl + '?path=patch/lecturers', JSON.stringify(payload));
  }
}
