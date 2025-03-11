import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = "http://localhost:5000/auth";

    constructor(private http: HttpClient) { }

    register(email :  any, pwd1 : any, pwd2 : any, nombre : any, apellidos : any, telefono : any) {
        let info = {
          Email : email,
          Pwd1 : pwd1, 
          Pwd2 : pwd2,
          Nombre: nombre,
          Apellidos: apellidos,
          Telefono: telefono
        }
        return this.http.post<any>(`${this.apiUrl}/register`, info);
    }

}