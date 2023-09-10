import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PostService } from '../post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userPosts: any[] = [];

  constructor(
    private authService: UserService,
    private postService: PostService
  ) {}
  posts: any;
  currentUser: any = localStorage?.getItem('currentUser'); // Retrieve user data from local storage

  ngOnInit() {
    debugger;

    const userId = JSON.parse(this.currentUser)._id;
    if (userId) {
      this.postService.getPostsByUserId(userId).subscribe(
        (response: any) => {
          this.posts = response;
          console.log('MY Posts array', response);
        },
        (error) => {
          // Handle network errors or other errors
          console.error('Error fetching posts:', error);
        }
      );
    }
  }
}
