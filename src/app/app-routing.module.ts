import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'tools',
    canActivate: [AuthGuard],
    loadChildren: 'app/tool/tool.module#ToolModule',
  },
  { path: '', redirectTo: 'tools', pathMatch: 'full' },
  { path: '**', redirectTo: 'tools' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
