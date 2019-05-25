import { SubDivisionsService } from '../../../@core/data/subDivisions.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-sub-division',
  templateUrl: './sub-division.component.html',
  styleUrls: ['./sub-division.component.scss'],
})
export class SubDivisionsComponent implements OnInit {

  settings = {
    mode: 'external',
    actions: {
      add: false,
      edit: true,
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
    private subDivisionsService: SubDivisionsService,
  ) {
    const data = this.subDivisionsService.getAllSubDivisions();
    this.source.load(data);
    subDivisionsService.observableSubDivisions.subscribe(newData => {
      this.source.load(newData);
    });
  }

  deleteConfirm(event): void {
    this.subDivisionsService.deleteSubDivision(event);
  }

  async onEdit(event, dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: {
        edit: true,
        title: 'Edit Sub Division',
        buttonText: 'Save',
        subDivision: event.data,
      },
      closeOnBackdropClick: true,
      hasScroll: true,
    });
  }

  ngOnInit() {

  }

  createSubDivision(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: {
        title: 'Create Sub Division',
        buttonText: 'Create Sub Division',
      },
      closeOnBackdropClick: true,
    });
  }

}
