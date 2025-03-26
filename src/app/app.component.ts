import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Lab-WSD';
  
  constructor(private router:Router, private userService: UserService) { }  

  ngOnInit() {
    // this.router.navigate(['/Index']);
    // this.router.events.subscribe(event => {
    // });
    // this.userService.checkLogin().subscribe(
    //   (Response: any) => {
    //     console.log(Response);
    //     if(Response != ""){
    //       this.router.navigate(['/Index']);
    //     }
    //   },
    //   (error: any) => {
    //     this.router.navigate(['/Login']);
    //   }
    // );
  }

}

