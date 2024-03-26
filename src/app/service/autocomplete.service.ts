import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { ApiResponse } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http: HttpClient) { }

  getCareersAutocompleteSuggestions(text: string): Observable<any> {
    const lowercaseText = text.toLowerCase();
    const params = new HttpParams()
      .set('path', 'autocomplete/careers')
      .set('autocompleteInputText', lowercaseText);

      return this.http.get<ApiResponse<string[]>>(environment.apiUrl, { params });
  }

  getWorkshopsAutocompleteSuggestions(text: string): Observable<any> {
    const lowercaseText = text.toLowerCase();
    const params = new HttpParams()
      .set('path', 'autocomplete/workshops')
      .set('autocompleteInputText', lowercaseText);

      return this.http.get<ApiResponse<string[]>>(environment.apiUrl, { params });
  }
}
