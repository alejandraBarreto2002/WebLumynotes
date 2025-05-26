import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  // corregido aquí
  imports: [MainLayoutComponent], // solo si usas standalone components
  standalone: true // agrega esto si usas standalone components
})
export class AppComponent {
  title = 'weblumynotes';
}
