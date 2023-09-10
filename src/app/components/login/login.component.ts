import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

export class User {
  constructor(
    public _id: string,
    public email: string,
    public password: string,
  ) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    console.log('Login Component Working...');
  }

  errorMessage: any;
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        (response: any) => {

          if (response.status === 'success') {
            debugger

            localStorage.setItem('currentUser', JSON.stringify(response.user));
            // Successful login
            // Fetch all user data and store it in local storage
           
            this.router.navigate(['/dashboard']); // Navigate to the dashboard
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        (error) => {
          // Handle network errors or other errors
          console.error('Login error:', error);
          this.errorMessage = 'An error occurred during login';
        }
      );
    }
  }
}
