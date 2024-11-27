import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;

  constructor(private router: Router, private cookies: CookieService) { }

  login(email: string, password: string){
    console.log(email, password);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      response => {
        firebase.auth().currentUser?.getIdToken()
        .then(
          token =>{
            this.token = token;
            this.cookies.set('token', this.token);
            this.router.navigate(['/']);
          }
        )
      },
      error =>{
        console.log(error);
      }
    )
  }

  getIdToken(){
    // return this.token;
    return this.cookies.get('token');
  }

  isAuth(){
    // return this.token;
    return this.cookies.get('token');
  }

  logout(){
    firebase.auth().signOut()
    .then(
      ()=>{
        this.token = '';
        this.cookies.set('token', this.token);
        this.router.navigate(['/login']);
      }
    )
  }
}
