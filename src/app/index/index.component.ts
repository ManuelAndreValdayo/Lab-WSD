import { Component , AfterViewInit, ElementRef, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  link : String = ""

  constructor(private router:Router, private userService: UserService, private el: ElementRef, private renderer: Renderer2) { }  


  ngAfterViewInit(): void {
    const elements: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll(".writing");

    elements.forEach((el, i) => {
      let tiempo = i * 2700
      setTimeout(() => this.typeEffect(el, 50, i), tiempo);
    });
  }

  private typeEffect(element: HTMLElement, speed: number, index: number): void {
    const text = element.getAttribute("data-text") || "";
    let charIndex = 0;

    const interval = setInterval(() => {
      element.textContent += text[charIndex];
      charIndex++;

      if (charIndex === text.length) {
        clearInterval(interval); // Detener el intervalo cuando termine el texto
        this.renderer.removeClass(element, "writing"); // Opcional: eliminar la clase "writing"
      }
    }, speed);

    // Simulación del $("#cv").css("opacity", "1") en Angular
    if (index === 1) {
      const cvElement = this.el.nativeElement.querySelector("#cv");
      if (cvElement) {
        this.renderer.setStyle(cvElement, "opacity", "1");
      }
    }
  }


  fncCargarLogin(event: Event): any{
    this.router.navigate(['/Login']);
  }

  fncEmpezar(){
    this.userService.checkLogin().subscribe(
      (Response: any) => {
        if(Response != ""){
          this.router.navigate(['/Panel/Profile']);
        }
      },
      (error: any) =>{
        console.log(error);
        this.router.navigate(['/Login']);
      }
    );
  }
}
