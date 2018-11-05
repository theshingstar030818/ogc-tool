import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [{
  path: '',
  component: ProjectsComponent,
  children: [
    { path: 'list', component: ListComponent }, 
    { path: 'map', component: MapComponent }, 
    { path: '', redirectTo: 'list', pathMatch: 'full' }, 
    { path: 'projects', loadChildren: './project/project.module#ProjectModule' }, 
    { path: '**', component: ListComponent }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule { }
