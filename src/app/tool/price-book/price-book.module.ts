import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceBookRoutingModule } from './price-book-routing.module';
import { PriceBookComponent } from './price-book.component';

@NgModule({
  imports: [
    CommonModule,
    PriceBookRoutingModule
  ],
  declarations: [PriceBookComponent]
})
export class PriceBookModule { }
