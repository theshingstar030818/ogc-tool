import { SubDivisionsService } from '../../../@core/data/subDivisions.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { CreateSubDivisionComponent } from '../../../@theme/components';


@Component({
  selector: 'ngx-sub-division',
  templateUrl: './sub-division.component.html',
  styleUrls: ['./sub-division.component.scss'],
})
export class SubDivisionsComponent implements OnInit {

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
        title: 'Sub Division Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.name;
        },
        compareFunction: (direction: any, a: any, b: any) => {
          return this.compareFunction(direction, a.name, b.name);
        },
        filterFunction: (a?: any, search?: string) => {
          return this.filterFunction(a.name, search);
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private dialogService: NbDialogService,
    private subDivisionsService: SubDivisionsService,
  ) {
    const data = this.subDivisionsService.getSubDivisions();
    this.source.load(data);
    subDivisionsService.observableSubDivisions.subscribe(newData => {
      this.source.load(newData);
    });
  }

  deleteConfirm(event): void {
    this.subDivisionsService.deleteSubDivision(event);
  }

  editConfirm(event): void {
    // console.log(event);
  }

  ngOnInit() {

  }

  createSubDivision() {
    this.dialogService.open(CreateSubDivisionComponent, {
      context: {
        title: 'Create Sub Division',
      },
      closeOnBackdropClick: false,
    });
  }

  compareFunction(direction: any, a: any, b: any) {

    let first = typeof a === 'string' ? a.toLowerCase() : a;
    let second = typeof b === 'string' ? b.toLowerCase() : b;

    if (first < second) {
      return -1 * direction;
    }
    if (first > second) {
      return direction;
    }
    return 0;
  }

  filterFunction(a?: any, search?: string): boolean {
    a = typeof a === 'string' ? a.toLowerCase() : a;
    search = typeof search === 'string' ? search.toLowerCase() : search;
    let match = a.indexOf(search) > -1;
    if (match || search === '') {
      return true;
    } else {
      return false;
    }
  }

}
