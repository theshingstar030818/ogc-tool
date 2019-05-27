import { Component, OnInit, TemplateRef } from '@angular/core';
import { DivisionsService } from '../../../@core/data/divisions.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.scss'],
})
export class DivisionsComponent implements OnInit {

  settings = {
    mode: 'external',
    actions: {
      add: false,
      edit: true,
      position: 'right',
      columnTitle: 'Options',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
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

  async onEdit(event, dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: {
        edit: true,
        title: 'Edit Division',
        buttonText: 'Save',
        division: event.data,
      },
      closeOnBackdropClick: true,
      hasScroll: true,
    });
  }

  createDivision(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: {
        title: 'Create Division',
        buttonText: 'Create Division',
      },
      closeOnBackdropClick: true,
    });
  }

}
