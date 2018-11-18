import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { PreviewComponent } from './preview/preview.component';
import { ShareComponent } from './share/share.component';

const routes: Routes = [{
  path: '',
  component: ProjectComponent,
  children: [
    { path: '', redirectTo: 'info' },
    { path: 'info', component: InfoComponent },
    { path: 'edit', component: EditComponent },
    { path: 'preview', component: PreviewComponent },
    { path: 'share', component: ShareComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }
