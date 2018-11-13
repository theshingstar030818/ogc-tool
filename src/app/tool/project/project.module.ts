import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { PreviewComponent } from './preview/preview.component';
import { ShareComponent } from './share/share.component';
import { ProjectComponent } from './project.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ProjectRoutingModule,
  ],
  declarations: [
    InfoComponent, 
    EditComponent, 
    PreviewComponent, 
    ShareComponent,
    ProjectComponent
  ]
})
export class ProjectModule { }
