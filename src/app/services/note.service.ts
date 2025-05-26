import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  apiUri = '/api/notes';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  getAllNotesData(): Observable<any> {
  return this.http.get<any>(this.apiUri);
}
newNote(data: any): Observable<any> {
  return this.http.post<any>(
    this.apiUri,
    data,
    { headers: this.httpOptions }
  );
}



}