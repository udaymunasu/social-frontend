// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // Update with your API URL

  constructor(private http: HttpClient) {}

  // Post user data with profile and cover pictures
  registerUser(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  storeUserDataInLocalStorage(user: any): void {
    // Store user data in local storage upon successful login
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUserFromLocalStorage(): any {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  // Get all users with their profile and cover pictures
  getAllUsers(): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.apiUrl}/list`, { headers: headers });
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }
}
