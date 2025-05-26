import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';


export const routes: Routes = [
  { path: '', redirectTo: 'calendario', pathMatch: 'full' },
  { path: 'calendario', component: TasksComponent },
];


