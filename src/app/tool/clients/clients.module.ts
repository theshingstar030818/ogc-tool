import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ClientTableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ClientsComponent,
    ClientTableComponent,
  ],
})
export class ClientsModule { }
