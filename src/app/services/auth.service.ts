import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  getProfile(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.getToken());
    return this.http.get(`${this.api}/profile/me`, { headers });
  }

  updateProfile(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.getToken());
    const id = localStorage.getItem('userId'); // o pásalo por props
    return this.http.put(`${this.api}/${id}`, data, { headers });
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
