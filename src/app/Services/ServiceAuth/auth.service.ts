import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  login(data: any): Observable<any> {
    return this.http
      .post(`${this.api}/login`, data, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('role_id', response.user.role_id);
          localStorage.setItem('id', response.user.id);
        })
      );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return new Observable((Observer) => {
        Observer.error('Token no encuentro para salir');
      });
    }

    return this.http
      .post(`${this.api}/logout`, {}, { headers: this.getAuthHeaders() })
      .pipe(
        tap(() => {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('userRole');
        })
      );
  }


  isAuthenticated(): Boolean{
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
}
