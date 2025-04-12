import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileForm :FormGroup;
  isReadonly: boolean = true; // Controla si los inputs están en solo lectura
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private fb : FormBuilder, private userService: UserService) { 
    this.profileForm = this.fb.group({
      strName: ['Juan Pérez', Validators.required],
      strSurnames: ['', Validators.required],
      strUsername: ['', Validators.required],
      strEmail: ['', Validators.required],
      intPhone: ['', Validators.required]    
    });
  }
  toggleInputs() {
    this.isReadonly = !this.isReadonly;
  }
  ngOnInit(): void {
    this.userService.getProfile().subscribe(
      (Response: any) => {
        console.log(Response);
      },
      (error: any) =>{
        console.log(error);
      }
    );
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  
}
