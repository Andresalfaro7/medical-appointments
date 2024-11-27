import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable({
    providedIn: 'root'
})

export class LoginGuardian implements CanActivate{
    constructor(private loginService: LoginService, private router: Router){  }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.loginService.isAuth() ? true : false;
    }
}