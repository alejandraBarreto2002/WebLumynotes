import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router'; // 👈 Asegúrate de importar RouterModule
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // 👈 Importa CommonModule para *ngIf

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule], // 👈 Agrega CommonModule y RouterModule
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  hideSidebarRoutes = ['/login', '/register'];
  showSidebar = true;
  routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkSidebar(this.router.url);

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkSidebar(event.urlAfterRedirects);
      }
    });
  }

  checkSidebar(url: string) {
    this.showSidebar = !this.hideSidebarRoutes.some(path => url.startsWith(path));
    console.log('URL:', url, '→ showSidebar:', this.showSidebar);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}

