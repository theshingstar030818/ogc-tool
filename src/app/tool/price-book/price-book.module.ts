import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceBookRoutingModule } from './price-book-routing.module';
import { PriceBookComponent } from './price-book.component';
import { ThemeModule } from '../../@theme/theme.module';
import { PriceBookTableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    PriceBookRoutingModule,
    ThemeModule,
  ],
  declarations: [
    PriceBookComponent,
    PriceBookTableComponent,
  ],
})
export class PriceBookModule { }
