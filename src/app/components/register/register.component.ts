import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { User } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];


  baseurl = "http://localhost:3000";
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  registerUser() {
      const user = this.userForm.value;
      debugger

      // Include the base64 representation of the profile picture in the user data
      user.profilePic = this.imagestring;

      this.userService.registerUser(user).subscribe((result) => {
        console.log(result);
        
      });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((users: any[]) => {
      this.users = users;
      console.log("this.users", this.users)
    });
  }



  imagestring = "";
  imageChanged(event:any){
    let file = event.target.files[0];
    debugger
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(reader.result != null){
        this.imagestring = reader.result.toString();
      }
    }
  }
}
