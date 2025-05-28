import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface Note {
  _id?: string;
  title: string;
  content: string;
  userId: string;
}

@Injectable({ providedIn: 'root' })
export class NoteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

   private getAuthHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getNotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notes`, this.getAuthHeaders());
  }

  createNote(note: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notes`, note, this.getAuthHeaders());
  }

  updateNote(id: string, data: Note): Observable<Note> {
  return this.http.put<Note>(`${this.apiUrl}/notes/${id}`, data, this.getAuthHeaders());
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notes/${id}`, this.getAuthHeaders());
  }


getStatistics(): Observable<any> {
  const token = localStorage.getItem('token'); // o donde lo estés guardando

  return this.http.get(`${this.apiUrl}/statistics`, {

  });
}
}
