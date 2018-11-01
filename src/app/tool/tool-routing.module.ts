import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolComponent } from './tool.component';
import { ProjectsComponent } from './projects/projects.component';
import { PriceBookComponent } from './price-book/price-book.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [{
  path: '',
  component: ToolComponent,
  children: [{
    path: 'projects',
    loadChildren: './projects/projects.module#ProjectsModule',
  }, {
    path: 'price-book',
    component: PriceBookComponent,
  }, {
    path: 'clients',
    component: ClientsComponent,
  }, {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  }, {
    path: '**',
    component: ProjectsComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolRoutingModule { }
