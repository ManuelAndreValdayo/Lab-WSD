import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  cardForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.cardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^\\s*[0-9]{4}\\s*[0-9]{4}\\s*[0-9]{4}\\s*[0-9]{1,4}\\s*$')]],
      cardName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      expiryDate: ['', [Validators.required, this.validateExpiryDate]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });
  }
  
  validateExpiryDate(control: any) {
    const value = control.value;
    if (!value.match(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)) {
      return { invalidFormat: true };
    }
    const [month, year] = value.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { expired: true };
    }
    return null;
  }

  formatCardNumber(event: any) {
    let inputValue = event.target.value.replace(/\D+/g, ''); // Elimina caracteres no numéricos
    inputValue = inputValue.replace(/\s+/g, ''); // Elimina espacios existentes
    inputValue = inputValue.replace(/(\d{4})/g, '$1 ').trim(); // Agrega espacios cada 4 dígitos
  
    // Limita la longitud a 19 caracteres (16 dígitos + 3 espacios)
    if (inputValue.length > 19) {
      inputValue = inputValue.slice(0, 19);
    }
  
    this.cardForm.controls['cardNumber'].setValue(inputValue, { emitEvent: false }); // Actualiza sin disparar evento
  }
  
  get cardType(): string {
    const number = this.cardForm.get('cardNumber')?.value;
    if (!number) return '';
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number) || /^222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720/.test(number)) return 'MasterCard';
    if (/^3[47]/.test(number)) return 'American Express';
    if (/^6/.test(number)) return 'Discover';
    return 'Desconocida';
  }

  submit() {
    if (this.cardForm.valid) {
      console.log('Tarjeta válida:', this.cardForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
