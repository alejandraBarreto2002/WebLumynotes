import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { NotesComponent } from './components/notes/notes.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', redirectTo: 'notes', pathMatch: 'full' },
      { path: 'notes', component: NotesComponent },
      { path: 'calendario', component: TasksComponent },
      { path: 'proyecto', component: TasksComponent },
      { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] }
    ]
  }
];
