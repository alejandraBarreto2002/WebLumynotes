import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';  // para ngFor, ngClass, date pipe
import { FormsModule } from '@angular/forms';    // para ngModel
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-tasks',
  imports: [
     CommonModule,
     FormsModule,
    FullCalendarModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
tasks: any[] = [];
  newTask = { title: '', description: '', dueDate: '', userId: '' };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.newTask.userId = user._id;
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks(this.newTask.userId).subscribe(data => {
      this.tasks = data;
    });
  }

  addTask() {
    if (!this.newTask.title) return;
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.newTask.title = '';
      this.newTask.description = '';
      this.newTask.dueDate = '';
      this.loadTasks();
    });
  }

  completeTask(task: any) {
    this.taskService.completeTask(task._id).subscribe(() => this.loadTasks());
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task._id).subscribe(() => this.loadTasks());
  }

  downloadPdf() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Título', 'Descripción', 'Fecha', 'Completada']],
      body: this.tasks.map(t => [t.title, t.description, t.dueDate?.substring(0, 10), t.completed ? 'Sí' : 'No'])
    });
    doc.save('tareas.pdf');
  }
  showForm = false;
  onDateClick(arg: any) {
    const clickedDate = arg.dateStr;
    this.taskService.getTasks(this.newTask.userId).subscribe(data => {
      this.tasks = data.filter((t: any) =>
        t.dueDate && t.dueDate.startsWith(clickedDate)
      );
    });
  }

  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.onDateClick.bind(this)
  };

}
