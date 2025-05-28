import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

login(user: { email: string; password: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/users/login`, user).pipe(
    tap((response) => {
      this.saveToken(response.token); // ya lo tenías
      localStorage.setItem('userId', response.user.id); // 👉 ESTO ES LO NUEVO
    })
  );
}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
    isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile`);  // Cambia la ruta según tu API
  }

  updateProfile(data: any): Observable<any> {
  const userId = localStorage.getItem('userId'); // 👈 Traes el ID
  return this.http.put(`${this.apiUrl}/users/${userId}`, data);
  }
}
