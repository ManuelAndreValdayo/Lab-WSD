import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  constructor(private userService: UserService, private router: Router) { }   
  fncCheckProxy(seccion: number){
    this.userService.checkLogin().subscribe(
      (Response: any) => {
        if(Response != ""){
          if(seccion == 1){
            this.router.navigate(['/Panel/Profile']);
          }else if(seccion == 2){
            this.router.navigate(['/Panel/Card']);
          }
        }
      },
      (error: any) =>{
        this.router.navigate(['/Login']);
      }
    );
  }
}
