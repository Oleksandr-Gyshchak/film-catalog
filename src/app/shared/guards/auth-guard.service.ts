import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {


  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canLoad() {
    console.log(
      !this.authService.isLoggedIn()
    );
    return (!this.authService.isLoggedIn());
  }

  canActivateChild() {
    return this.canActivate();
  }

}
