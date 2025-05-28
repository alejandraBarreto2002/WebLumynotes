import { Component } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];

  newTask = {
  title: '',
  description: '',
  dueDate: '',
  completed: false
};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (this.newTask.dueDate) {
    this.newTask.dueDate = this.newTask.dueDate.substring(0, 10); // yyyy-MM-dd para el input date
  }
    this.loadTasks();
  }

// Cuando cargas tareas (para mostrar bien la fecha en el input):
loadTasks(): void {
  this.taskService.getTasks().subscribe(data => {
    this.tasks = data;

    // Formato de fecha para el input, si se requiere
    this.tasks.forEach(task => {
      if (task.dueDate) {
        task.dueDate = task.dueDate.substring(0, 10);
      }
    });

    console.log('📋 Tareas cargadas:', this.tasks); // Log de verificación
  });
}

// En addTask(), antes de enviar la tarea al backend, convierte la fecha a ISO
addTask() {
  if (!this.newTask.title) return;
  this.taskService.createTask(this.newTask).subscribe(() => {
    this.newTask.title = '';
    this.newTask.description = '';
    this.newTask.dueDate = '';
    this.loadTasks(); // carga sin userId porque el backend ya sabe quién es
  });
}


  completeTask(task: Task) {
    this.taskService.completeTask(task._id!).subscribe(() => this.loadTasks());
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task._id!).subscribe(() => this.loadTasks());
  }

  downloadPdf() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Título', 'Descripción', 'Fecha', 'Completada']],
      body: this.tasks.map(t => [
        t.title,
        t.description || '',
        t.dueDate ? t.dueDate.substring(0, 10) : '',
        t.completed ? 'Sí' : 'No'
      ])
    });
    doc.save('tareas.pdf');
  }

  showForm = false;

  onDateClick(arg: any) {
    const clickedDate = arg.dateStr;
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.filter(t => t.dueDate?.startsWith(clickedDate));
    });
  }

  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.onDateClick.bind(this)
  };
}
