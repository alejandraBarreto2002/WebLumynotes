import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet]  // Aquí debe estar RouterOutlet, no MainLayoutComponent
})
export class AppComponent {
  title = 'weblumynotes';
}
