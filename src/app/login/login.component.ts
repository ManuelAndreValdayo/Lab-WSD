import { Component } from '@angular/core';
import { FormsModule , ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  isUserNameInvalid = false;
  isPasswordInvalid = false;

  constructor(private userService: UserService, private router:Router) { }
  
  formLogin = new FormGroup({
    strUserName: new FormControl(''),
    strPassword: new FormControl(''),
  });
  login(): void {
    if(this.validate()){
      this.userService.login(
        this.formLogin.value.strUserName,
        this.formLogin.value.strPassword
      ).subscribe(
        (response: any) => {
          localStorage.setItem('access_token', JSON.parse(response).access_token);
            Swal.fire({
            title: 'Login successful',
            text: 'You have successfully logged in!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/Panel/Profile']);
            }
          });
        },
        error => {
          if(error.status === 409){
            Swal.fire({
              title: 'Error',
              text: 'The email or username is already registered.',
              icon: 'error',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          }else{
            Swal.fire({
              title: 'Error',
              text: 'There was an error registering. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }
      );
    }
  }
  validate(): boolean {
    let isValid = true;
    this.isUserNameInvalid = false;
    this.isPasswordInvalid = false;


    if(this.formLogin.value.strUserName == ""){
      this.isUserNameInvalid = true;
      isValid = false;
    }
    if(this.formLogin.value.strPassword == ""){
      this.isPasswordInvalid = true;
      isValid = false;
    }

    return isValid;
  }
}
