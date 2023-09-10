// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Update with your API URL

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, loginData);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, userData);
  }

  // Store user ID in local storage after successful login
  setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  // Retrieve user ID from local storage
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Logout by removing user ID from local storage
  logout() {
    localStorage.removeItem('userId');
  }
}
