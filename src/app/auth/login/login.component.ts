import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { AuthService } from '../../@core/data/auth.service';
import { AppInjector } from '../../app.module';
import { Parse } from 'parse';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  authService: AuthService = AppInjector.get(AuthService);

  ngOnInit() {
    this.socialLinks = [];
  }

  async login() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const response = await this.authService.authenticate(this.user.email, this.user.password);
    this.submitted = false;

    if (response instanceof Parse.Error) {
      this.errors = ['Code : ' + response.code, response.message];
    } else {
      this.messages = ['Login Successful'];
      this.router.navigateByUrl('/');
    }
    this.cd.detectChanges();
  }

}
