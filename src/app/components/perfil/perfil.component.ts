import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true, // ✅ Necesario para standalone apps
  imports: [CommonModule, ReactiveFormsModule], // ✅ Importa los módulos requeridos
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({ name: [''], profilePic: [''] });
  }

  ngOnInit(): void {
    this.auth.getProfile().subscribe({
      next: (res) => this.form.patchValue(res),
      error: () => alert('Error al cargar perfil')
    });
  }

  guardar(): void {
    this.auth.updateProfile(this.form.value).subscribe({
      next: () => alert('Perfil actualizado'),
      error: () => alert('Error al actualizar perfil')
    });
  }
}
