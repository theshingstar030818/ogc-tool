import { Component, OnInit } from '@angular/core';
import { NbLogoutComponent } from '@nebular/auth';
import { AuthService } from '../../@core/data/auth.service';
import { AppInjector } from '../../app.module';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent extends NbLogoutComponent implements OnInit {

  authService: AuthService = AppInjector.get(AuthService);

  ngOnInit() {
    this.logout()
  }
  
  async logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/');
    });
  }

}
