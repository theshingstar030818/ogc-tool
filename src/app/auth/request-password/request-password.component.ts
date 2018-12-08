import { Component, OnInit } from '@angular/core';
import { NbRequestPasswordComponent } from '@nebular/auth';
import { AuthService } from '../../@core/data/auth.service';
import { AppInjector } from '../../app.module';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
})
export class RequestPasswordComponent extends NbRequestPasswordComponent implements OnInit {

  authService: AuthService = AppInjector.get(AuthService);

  ngOnInit() {
  }

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    // console.log(this.user);

    this.authService.requestPassword(this.user).then(() => {
      this.messages = ['Password reset email was sent. Please check your mailbox.'];
    }).catch((error) => {
      this.errors = [error];
    });

    this.submitted = false;
    this.cd.detectChanges();
  }

}
