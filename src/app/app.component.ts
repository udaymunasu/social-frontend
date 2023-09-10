import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'social-app';
  constructor(private router: Router) {}

  logout() {
    // Clear local storage data
    localStorage.clear();

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
