import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = "http://localhost:5000/user";

    constructor(private http: HttpClient) { }

    register(email :  any, pwd1 : any, name : any, surnames : any, username : any) {
        let info = {
          email : email,
          password : pwd1, 
          name: name,
          surnames: surnames,
          username: username
        }
        return this.http.post<any>(`${this.apiUrl}/register`, info);
    }
    login(username :  any, pwd : any) {
        let info = {
          username : username,
          password : pwd
        }
        return this.http.post<any>(`${this.apiUrl}/login`, info, { responseType: 'text' as 'json', withCredentials : true});
    }
    checkLogin() : any{
        const token = (localStorage.getItem('access_token')) ? localStorage.getItem('access_token') : "";
        const headers = {
            "Authorization" : `Bearer ${token}`
        }
        return this.http.get<any>(`${this.apiUrl}/checkLogin`, { headers });

    }
}