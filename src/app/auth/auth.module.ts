import { CommonModule } from '@angular/common';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../@core/data/auth.service';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

export let AppInjector: Injector;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,

    NbAuthModule,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { 
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
