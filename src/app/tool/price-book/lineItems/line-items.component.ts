import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { LineItemsService } from '../../../@core/data/line-items.service';
import { CreateLineItemComponent } from '../../../@theme/components/create-pricebook/line-item/line-item.component';
@Component({
  selector: 'ngx-table',
  templateUrl: './line-items.component.html',
  styleUrls: ['./line-items.component.scss'],
})
export class LineItemsTableComponent implements OnInit {

  settings = {
    mode: 'internal',
    actions: {
      add: false,
      position: 'right',
      columnTitle: 'Options',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      'title': {
        title: 'Name',
        type: 'string',
      },
      'unitType': {
        title: 'Unit Type',
        type: 'string',
      },
      'description': {
        title: 'Description',
        type: 'string',
      },
      'ogcNotes': {
        title: 'OGC Notes',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private dialogService: NbDialogService,
    private lineItemsService: LineItemsService,
  ) {
    const data = this.lineItemsService.getLintItem();
    this.source.load(data);
    lineItemsService.observablePriceBook.subscribe(newData => {
      this.source.load(newData.map(value => {
        return {paresObject: value, ...value.attributes};
      }));
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.lineItemsService.removeLineItem(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() { }

  createLineItem() {
    this.dialogService.open(CreateLineItemComponent, {
      context: {
        title: 'Create Line Item',
      },
      closeOnBackdropClick: false,
    });
  }

  async onEdit(event) {
    let lineItem = event.newData.paresObject;
    for (let key in this.settings.columns) {
      if (lineItem.attributes[key]) {
        lineItem.set(key, event.newData[key]);
      }
    }
    await lineItem.save();
    event.confirm.resolve();
  }

}
