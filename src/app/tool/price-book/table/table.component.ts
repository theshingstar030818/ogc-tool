import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { PriceBookService } from '../../../@core/data/pricebook.service';


@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class PriceBookTableComponent implements OnInit {

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
      "attributes.title": {
        title: 'Line Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.title;
        },
      },
      "attributes.price": {
        title: 'Price Per Unit',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.material;
        },
      },
      "attributes.type": {
        title: 'Unit Type',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.unitType;
        },
      },
      "attributes.quantity": {
        title: 'Qty',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.qty;
        },
      },
      "tax": {
        title: 'tax %',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.tax;
        },
      },
      "total": {
        title: 'Total $',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.total;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: PriceBookService) {
    const data = this.service.getPriceBook();
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
    this.service.removePriceBook(event);
  }

  ngOnInit() {
  }

}
