import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ThemeModule } from '../../@theme/theme.module';
// import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { ListModule } from './list/list.module';

const components = [
  // ListComponent,
  MapComponent
]

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ThemeModule,
    ListModule,
  ],
  declarations: [
    ProjectsComponent,
    ...components,
  ],
  entryComponents: [
    ...components
  ]
})
export class ProjectsModule { }
