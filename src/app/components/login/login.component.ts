import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // 👈 Importa RouterModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // 👈 Agrega RouterModule
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/perfil']);
      },
      error: (err) => alert(err.error.message || 'Error al iniciar sesión')
    });
  }
}