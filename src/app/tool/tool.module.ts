import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolRoutingModule } from './tool-routing.module';
import { ToolComponent } from './tool.component';
import { ProjectsModule } from './projects/projects.module';
import { ThemeModule } from '../@theme/theme.module';
import { PriceBookModule } from './price-book/price-book.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectModule } from './project/project.module';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbButtonModule,
    ToolRoutingModule,
    ProjectsModule,
    ProjectModule,
    PriceBookModule,
    ClientsModule,
    ThemeModule,
  ],
  declarations: [
    ToolComponent,
  ],
})
export class ToolModule { }
