import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  dueDate?: string;       // este es el nombre correcto del campo fecha
  completed: boolean;
  userId?: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

private getAuthHeaders() {
  const token = this.authService.getToken();
  console.log('🔐 Enviando token:', token); // <-- Asegúrate que no es null
  return {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
    }),
  };
}

getTasks(): Observable<Task[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<Task[]>(`${this.apiUrl}/tasks`, { headers });
}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task, this.getAuthHeaders());
  }
// ✅ Actualizar tarea por ID
  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task, this.getAuthHeaders());
  }

  // ✅ Eliminar tarea por ID
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, this.getAuthHeaders());
  }

  // ✅ Marcar tarea como completada o no (opcional)
  toggleTaskCompletion(task: Task): Observable<Task> {
    const updated = { completed: !task.completed };
    return this.http.put<Task>(`${this.apiUrl}/tasks/${task._id}`, updated, this.getAuthHeaders());
  }
  completeTask(id: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/tasks/${id}/complete`, {}, this.getAuthHeaders());
}
}
