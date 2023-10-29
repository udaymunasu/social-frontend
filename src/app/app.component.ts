import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'social-app';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.isLoggedIn = localStorage?.['user']?._id
  }

  isLoggedIn: boolean
  logout() {
    // Clear local storage data
    localStorage.clear();

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
