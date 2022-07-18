import { HttpClient } from '@angular/common/http';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  isLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());;
  decodedToken: any;
  constructor(private http: HttpClient) {

  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
            localStorage.setItem('username', this.decodedToken.name);
            this.isLoginSubject.next(true);
          }
        })
      )
  }

  hasToken() {
    const token = localStorage.getItem('token');

    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }



  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoginSubject.next(false);
    console.log('logged out');
  }


  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }


}
