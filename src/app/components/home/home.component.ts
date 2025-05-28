import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recentTasks: { title: string; content: string }[] = [];
  monthlyTip: string = '';

  ngOnInit(): void {
    // Simulación de tareas recientes (puedes reemplazar luego con NoteService)
    this.recentTasks = [
      { title: 'Revisar proyecto Lumy', content: 'Verificar el avance de tareas y mockups.' },
      { title: 'Subir commit al backend', content: 'CRUD de notas y estadísticas funcionales.' },
      { title: 'Reunión con el equipo', content: 'Discutir cambios en diseño del home.' }
    ];

    const month = new Date().getMonth(); // 0 = Enero, 11 = Diciembre
    const tipsByMonth = [
      '🌱 Enero: Empieza con intención. Lo que hoy siembras, mañana florece.',
      '❤️ Febrero: Rodéate de cosas que amas. Inclúyete a ti misma.',
      '🌼 Marzo: Haz limpieza mental y digital. Espacio limpio, mente clara.',
      '🌸 Abril: Crea sin miedo. Tu creatividad es tu superpoder.',
      '🌞 Mayo: Aprovecha tu energía al máximo. Organízate y actúa.',
      '🌿 Junio: Equilibra trabajo y descanso. Cuidarte también es avanzar.',
      '🌻 Julio: Confía en tu proceso. Cada paso cuenta.',
      '🔥 Agosto: Retoma lo que pausaste. Estás a tiempo.',
      '📚 Septiembre: Aprende algo nuevo. El conocimiento es poder.',
      '🎯 Octubre: Sé constante, no perfecta. Avanza aunque sea lento.',
      '🍁 Noviembre: Agradece lo recorrido. Has hecho más de lo que crees.',
      '🎉 Diciembre: Celebra tus logros. ¡Este año también fue tuyo!'
    ];

    this.monthlyTip = tipsByMonth[month];
  }
}
