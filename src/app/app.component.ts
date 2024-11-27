import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './pages/login/login.service';
import { CommonModule } from '@angular/common';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Citas Médicas';
  auth: boolean = false;

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyChXa3bg5jKy8IqcRSFD4D__zkVJGLbh7U",
      authDomain: "andres-alfaro-ing.firebaseapp.com",
    });
  }

  constructor(private loginService: LoginService, private router: Router){ }

  isAuth(){
    return this.loginService.isAuth();
  }

  logOut(){
    this.auth = false;
    this.loginService.logout();
  }
}
