import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { PreviewComponent } from './preview/preview.component';
import { ShareComponent } from './share/share.component';
import { ProjectComponent } from './project.component';
import { NbAccordionModule, NbListModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbAccordionModule,
    NbListModule,
  ],
  declarations: [
    InfoComponent,
    EditComponent,
    PreviewComponent,
    ShareComponent,
    ProjectComponent,
  ],
})
export class ProjectModule { }
