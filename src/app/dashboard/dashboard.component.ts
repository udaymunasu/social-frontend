import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { Post } from '../../models/post.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  id: any;
  formdata: any;
  categories: any;
  product: any;

  imagestring = '';
  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formdata = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      location: [''],
      comment: [''],
    });

    // this.commentForm = this.fb.group({
    //   text: [''],
    // });
  }

  ngOnInit() {
    console.log('dashboard Component Working...');
    this.fetchPosts();
  }

  currentUser: any = localStorage?.getItem('currentUser'); // Retrieve user data from local storage

  onClickSubmit() {
    const data = this.formdata.value;
    data.userImage = this.imagestring;
    data.userId = JSON.parse(this.currentUser)._id;
    this.dataService.createPost(data).subscribe((result: any) => {
      console.log(result);
      // this.router.navigate(['/admin/products']);
    });
  }

  posts: any;

  fetchPosts() {
    // Fetch all posts
    debugger;

    this.dataService.getAllPosts().subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.posts = response.data;

          console.log('this.posts', this.posts);
        } else {
          // Handle API error
        }
      },
      (error) => {
        // Handle network errors or other errors
      }
    );
  }

  imageChanged(event: any) {
    debugger;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result != null) {
        this.imagestring = reader.result.toString();
      }
    };
  }

  likePost(postId: string) {
    debugger;
    this.dataService.likePost(postId).subscribe((data) => {
      // Update the post with the new data
      const index = this.posts.findIndex((post) => post._id === postId);
      if (index !== -1) {
        this.posts[index] = data;
      }
      this.fetchPosts();
    });
    this.fetchPosts();
  }

  unlikePost(postId: string) {
    this.dataService.unlikePost(postId).subscribe((data) => {
      // Update the post with the new data
      const index = this.posts.findIndex((post) => post._id === postId);
      if (index !== -1) {
        this.posts[index] = data;
      }
    });
  }

  addCommentToPost(post: any) {
    const text = this.formdata?.value.comment;

    let postId = post?._id;
    const userId = JSON.parse(this.currentUser)._id;
    let data = { userId, postId, text };

    this.dataService.addPostComment(data).subscribe(
      (response) => {
        // Handle success: Update the UI to reflect the new comment
        console.log('Comment added:', response);

        // Optionally, you can refresh the post data to display the updated comments
      },
      (error) => {
        // Handle error: Display an error message or handle it as needed
        console.error('Error adding comment:', error);
      }
    );
    this.fetchPosts();
    this.formdata.reset()
  }

  onDeleteComment(postId: string, commentId: string): void {
    this.dataService.deleteComment(postId, commentId).subscribe(
      (response) => {
        if (response.success) {
          // Comment deleted successfully
          // You can refresh the post data here if needed
        } else {
          // Handle the error message from the response
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Error deleting comment:', error);
      }
    );
    this.fetchPosts();
  }
}
