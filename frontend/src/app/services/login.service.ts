// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   private apiUrl = 'http://127.0.0.1:8000/test'; // Replace with your Symfony API URL

//   constructor(private http: HttpClient) { }

//   login(emailOrUsername: string, password: string) {
//     const loginData = {
//       emailOrUsername: emailOrUsername,
//       password: password
//     };
//     console.log (loginData);
//     // return this.http.post(`${this.apiUrl}`, loginData);
//     return this.http.get(`${this.apiUrl}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/users/login'; // Replace with your Symfony API URL

  constructor(private http: HttpClient) { }

  login(emailOrUsername: string, password: string) {
    const loginData = {
      emailOrUsername: emailOrUsername,
      password: password
    };

    console.log(loginData);
    return this.http.post(`${this.apiUrl}`, loginData);
  }
}

