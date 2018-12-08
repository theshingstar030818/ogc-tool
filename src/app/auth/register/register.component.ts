import { Component, OnInit } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';
import { AuthService } from '../../@core/data/auth.service';
import { AppInjector } from '../../app.module';
import { Parse } from 'parse';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends NbRegisterComponent implements OnInit {

  authService: AuthService = AppInjector.get(AuthService);

  ngOnInit() {
    this.socialLinks = [];
  }

  async register() {
    this.errors = this.messages = [];
    this.submitted = true;

    const response = await this.authService.register(this.user);
    this.submitted = false;

    if (response instanceof Parse.Error) {
      this.errors = ['Code : ' + response.code, response.message];
    } else {
      this.messages = ['Singup Successful'];
      setTimeout(() => {
        return this.router.navigateByUrl('/');
      }, this.redirectDelay);
    }
    this.cd.detectChanges();
  }

}
