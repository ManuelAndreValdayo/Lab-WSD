import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isNameValid = true;
  isSurnamesValid = true;
  isUsernameValid = true;
  isEmailValid = true;
  isPasswordValid = true;
  isPassword2Valid = true;

  isPasswordLength = true;
  isPasswordUppercase = true;
  isPasswordLowercase = true;
  isPasswordNumber = true;

  constructor(private userService: UserService) { }
  
  formRegister = new FormGroup({
    strName: new FormControl(''),
    strSurnames: new FormControl(''),
    strUsername: new FormControl(''),
    strEmail: new FormControl(''),
    strPassword: new FormControl(''),
    strPassword2: new FormControl(''),
  });


  register(item: any = ""): void {
    if(this.validate()){
      this.userService.register(
        this.formRegister.value.strName,
        this.formRegister.value.strSurnames,
        this.formRegister.value.strUsername,
        this.formRegister.value.strEmail,
        this.formRegister.value.strPassword,
        this.formRegister.value.strPassword2
      ).subscribe(
        ok => {
          console.log('Registro exitoso', ok);
    
          Swal.fire({
            title: 'Registro exitoso',
            text: '¡Tu registro se ha completado correctamente!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
            }
          });
        },
        error => {
          console.error('Error en el registro', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al registrar. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }

  validate(): boolean {
    let bValid = true;
    if (this.formRegister.value.strName === "") {
      bValid = false;
      this.isNameValid = false;
    }else{
      this.isNameValid = true;
    }
    if (this.formRegister.value.strSurnames === "") {
      this.isSurnamesValid = false;
      bValid = false;
    }else{
      this.isSurnamesValid = true;
    }
    if (this.formRegister.value.strUsername === "") {
      this.isUsernameValid = false;
      bValid = false;
    }else{
      this.isUsernameValid = true;
    }
    if (this.formRegister.value.strEmail === "") {
      this.isEmailValid = false;
      bValid = false;
    }else{
      this.isEmailValid = true;
    }
    if (this.formRegister.value.strPassword === "") {
      this.isPasswordValid = false;
      bValid = false;
    }else{
      this.isPasswordValid = true;
    }
    if (this.formRegister.value.strPassword2 === "") {
      this.isPassword2Valid = false;
      bValid = false;
    }else{
      this.isPassword2Valid = true;
      if (this.formRegister.value.strPassword !== this.formRegister.value.strPassword2) {
        this.isPassword2Valid = false;
        this.isPasswordValid = false;
        bValid = false;
      }else{
        if(this.isSecurePassword(this.formRegister.value.strPassword)){
          this.isPassword2Valid = true;
          this.isPasswordValid = true;
        }else{
          this.isPassword2Valid = false;
          this.isPasswordValid = false;
          bValid =false;
        }
      }
    }
    return bValid;

  }
  isSecurePassword(password: any): boolean {
    // el !! se usa para convertir el valor a booleano
    let bValid = true;
    if(!(password.length >= 8)){
      this.isPasswordLength = false;
      bValid = false;
    }else{
      this.isPasswordLength = true;
    }
    if(!(!!password.match(/[A-Z]/))){
      this.isPasswordUppercase = false;
      bValid = false;
    }else{
      this.isPasswordUppercase = true;
    }
    if(!(!!password.match(/[a-z]/))){
      this.isPasswordLowercase = false;
      bValid = false;
    }else{
      this.isPasswordLowercase = true;
    }
    if(!(!!password.match(/[0-9]/))){
      this.isPasswordNumber = false;
      bValid = false;
    }else{
      this.isPasswordNumber = true;
    }
    return bValid;
  }
}
