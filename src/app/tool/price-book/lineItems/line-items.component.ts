import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { LineItemsService } from '../../../@core/data/lint-tems.service';
import { CreateLineItemComponent } from '../../../@theme/components/create-pricebook/line-item/line-item.component';
// import { SmartTableService } from '../../../@core/data/smart-table.service';


@Component({
  selector: 'ngx-table',
  templateUrl: './line-items.component.html',
  styleUrls: ['./line-items.component.scss'],
})
export class LineItemsTableComponent implements OnInit {

  settings = {
    mode: 'external',
    actions: {
      add: false,
      position: 'right',
      columnTitle: 'Options',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      'attributes.title': {
        title: 'Line Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.title;
        },
      },
      // 'attributes.price': {
      //   title: 'Price Per Unit',
      //   type: 'string',
      //   valuePrepareFunction: (cell, row) => {
      //     return row.attributes.material;
      //   },
      // },
      'attributes.type': {
        title: 'Unit Type',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.unitType;
        },
      },
      // 'attributes.quantity': {
      //   title: 'Qty',
      //   type: 'string',
      //   valuePrepareFunction: (cell, row) => {
      //     return row.attributes.qty;
      //   },
      // },
      // 'tax': {
      //   title: 'tax %',
      //   type: 'string',
      //   valuePrepareFunction: (cell, row) => {
      //     return row.attributes.tax;
      //   },
      // },
      // 'total': {
      //   title: 'Total $',
      //   type: 'number',
      //   valuePrepareFunction: (cell, row) => {
      //     return row.attributes.total;
      //   },
      // },
      'description': {
        title: 'Description',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.description;
        },
      },
      'ogcNotes': {
        title: 'OGC Notes',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.ogcNotes;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private dialogService: NbDialogService,
    private service: LineItemsService,
  ) {
    const data = this.service.getLintItem();
    this.source.load(data);
    service.observablePriceBook.subscribe(newData => {
      this.source.load(newData);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDelete(event): void {
    this.service.removeLineItem(event);
  }

  ngOnInit() {

  }

  createLineItem() {
    this.dialogService.open(CreateLineItemComponent, {
      context: {
        title: 'Create Line Item',
      },
      closeOnBackdropClick: false,
    });
  }

}
