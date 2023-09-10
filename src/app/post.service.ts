// src/app/post.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000'; // Replace with your backend API endpoint

  constructor(private http: HttpClient) {}

  createPost(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/createPost`, data);
  }

  getAllPosts() {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.apiUrl}/posts`, { headers: headers });
  }

  getUserById(userId: string): Observable<any> {
    const headers = { 'Content-type': 'application/json' };
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  getPostsByUserId(userId: string) {
    return this.http.get(`${this.apiUrl}/posts/user/${userId}`);
  }

  likePost(postId: string): Observable<any> {
    debugger
    const url = `${this.apiUrl}/posts/${postId}/like`;
    return this.http.post<any>(url, {});
  }

  unlikePost(postId: string): Observable<any> {
    debugger
    const url = `${this.apiUrl}/posts/${postId}/unlike`;
    return this.http.post<any>(url, {});
  }

  addPostComment(data: any): Observable<any> {
    debugger;
    const postId = data?.postId;
    return this.http.post(`${this.apiUrl}/posts/${postId}/comment`, data);
  }

  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/posts/${postId}/comment/${commentId}`);
  }
}
