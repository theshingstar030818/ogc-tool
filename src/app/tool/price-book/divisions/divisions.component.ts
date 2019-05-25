import { Component, OnInit } from '@angular/core';
import { DivisionsService } from '../../../@core/data/divisions.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { CreateDivisionComponent } from '../../../@theme/components/create-pricebook/division/division.component';

@Component({
  selector: 'ngx-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.scss'],
})
export class DivisionsComponent implements OnInit {

  settings = {
    mode: 'inline',
    actions: {
      add: false,
      edit: false,
      position: 'right',
      columnTitle: 'Options',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      'id': {
        title: 'ID',
        type: 'string',
        editable: false,
        valuePrepareFunction: (cell, row) => {
          return row.id;
        },
      },
      'attributes': {
        title: 'Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.name;
        },
        compareFunction: (direction: any, a: any, b: any) => {
          return SmartTableService.compareFunction(direction, a.name, b.name);
        },
        filterFunction: (a?: any, search?: string) => {
          return SmartTableService.filterFunction(a.name, search);
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private dialogService: NbDialogService,
    private divisionsService: DivisionsService,
  ) {
    const data = this.divisionsService.getAllDivisions();
    this.source.load(data);
    divisionsService.observableDivisions.subscribe(newData => {
      this.source.load(newData);
    });
  }

  ngOnInit() {
  }

  deleteConfirm(event): void {
    this.divisionsService.deleteDivision(event);
  }

  createDivision() {
    this.dialogService.open(CreateDivisionComponent, {
      context: {
        title: 'Create Division',
      },
      closeOnBackdropClick: false,
    });
  }

}
