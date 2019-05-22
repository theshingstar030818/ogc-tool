import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceBookRoutingModule } from './price-book-routing.module';
import { PriceBookComponent } from './price-book.component';
import { ThemeModule } from '../../@theme/theme.module';
import { LineItemsTableComponent } from './lineItems/line-items.component';
import { SubDivisionsComponent } from './subDivisions/sub-division.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { ProjectTemplatesComponent } from './projectTemplates/project-templates.component';
@NgModule({
  imports: [
    CommonModule,
    PriceBookRoutingModule,
    ThemeModule,
  ],
  declarations: [
    PriceBookComponent,
    LineItemsTableComponent,
    SubDivisionsComponent,
    DivisionsComponent,
    ProjectTemplatesComponent,
  ],
  entryComponents: [

  ],
})
export class PriceBookModule { }
