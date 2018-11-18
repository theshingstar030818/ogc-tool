import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';
import { AuthService } from './@core/data/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    // private authService: NbAuthService, 
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate() {
    if(this.authService.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['auth/login']);
    }
  }
}
