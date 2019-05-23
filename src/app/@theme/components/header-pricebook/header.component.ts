import { Component } from '@angular/core';

import { LineItemsService } from '../../../@core/data/lint-tems.service';

@Component({
  selector: 'ngx-header-pricebook',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderPriceBookComponent {

  constructor(
    public lineItemsService: LineItemsService,
  ) { }
}
