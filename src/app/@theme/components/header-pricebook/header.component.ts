import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { PriceBookService } from '../../../@core/data/pricebook.service';
import { CreateLineItemComponent } from '../create-pricebook/line-item/line-item.component';
import { CreateLineItemGroupComponent } from '../create-pricebook/group/group.component';

@Component({
  selector: 'ngx-header-pricebook',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderPriceBookComponent {

  constructor(
    private dialogService: NbDialogService,
    protected pricebookService: PriceBookService,
  ) { }

  createLineItem() {
    this.dialogService.open(CreateLineItemComponent, {
      context: {
        title: 'Create Line Item',
      },
      closeOnBackdropClick: false,
    });
  }

  createGroup() {
    this.dialogService.open(CreateLineItemGroupComponent, {
      context: {
        title: 'Create Line Item Group',
      },
      closeOnBackdropClick: false,
    });
  }
}
