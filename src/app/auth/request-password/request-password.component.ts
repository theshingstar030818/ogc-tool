import { Component, OnInit } from '@angular/core';
import { NbRequestPasswordComponent } from '@nebular/auth';
import { AuthService } from '../../@core/data/auth.service';
import { AppInjector } from '../../app.module';
import { Parse } from 'parse';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent extends NbRequestPasswordComponent implements OnInit {

  authService: AuthService = AppInjector.get(AuthService);

  ngOnInit() {
  }

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    console.log(this.user);

    this.authService.requestPassword(this.user)
      this.submitted = false;
    //   if (result.isSuccess()) {
    //     this.messages = result.getMessages();
    //   } else {
    //     this.errors = result.getErrors();
    //   }

    //   const redirect = result.getRedirect();
    //   if (redirect) {
    //     setTimeout(() => {
    //       return this.router.navigateByUrl(redirect);
    //     }, this.redirectDelay);
    //   }
    //   this.cd.detectChanges();
    // });
  }

}
