import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { NotesComponent } from './components/notes/notes.component';


export const routes: Routes = [
  { path: '', redirectTo: 'calendario', pathMatch: 'full' },
  { path: 'calendario', component: TasksComponent },
  { path: 'notas', component: NotesComponent } // ✅ Agrega esta ruta
];


