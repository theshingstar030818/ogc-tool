import { Component } from '@angular/core';

import { PriceBookService } from '../../../@core/data/pricebook.service';

@Component({
  selector: 'ngx-header-pricebook',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderPriceBookComponent {

  constructor(
    public pricebookService: PriceBookService,
  ) { }
}
