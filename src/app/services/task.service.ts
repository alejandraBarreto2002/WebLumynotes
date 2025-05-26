import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(userId: string) {
    return this.http.get<any[]>(`${this.baseUrl}?userId=${userId}`);
  }

  createTask(task: any) {
    return this.http.post(this.baseUrl, task);
  }

  completeTask(id: string) {
    return this.http.put(`${this.baseUrl}/${id}/complete`, {});
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

