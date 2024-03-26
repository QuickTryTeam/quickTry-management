import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Token } from '../interface/login';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenName = 'token';
  private nickname = 'nickname';
  private role = 'role';
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  
  login(username: string, password: string): Observable<ApiResponse<Token>> {
    const payload = {
      username: username,
      password: password
    };

    return this.http.post<ApiResponse<Token>>(environment.apiUrl + '?path=login', JSON.stringify(payload));
  }

  isLogin():boolean {
    if(localStorage.getItem(this.tokenName)) {
      return true
    }
    return false
  }

  logout() {
    localStorage.removeItem(this.tokenName);
    this.router.navigate(['/login'])
  }

  forwardToLogin() {
    this.router.navigate(['/login'])
  }

  saveToken(token: string, nickname: string, role: string) {
    localStorage.setItem(this.tokenName, token)
    localStorage.setItem(this.nickname, nickname)
    localStorage.setItem(this.role, role)
  }

  getToken():string {
    return localStorage.getItem(this.tokenName)||"";
  }
}