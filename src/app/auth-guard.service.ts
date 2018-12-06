import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './@core/data/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    // private authService: NbAuthService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
    }
  }
}
