import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor( private loginService: LoginService ){ }

  login(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.loginService.login(email, password);
  }
}
