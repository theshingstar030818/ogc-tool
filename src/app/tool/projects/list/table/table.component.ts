import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ProjectsService } from '../../../../@core/data/projects.service';
import { Router } from '@angular/router';
import { SmartTableService } from '../../../../@core/data/smart-table.service';


@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  settings = {
    mode: 'external',
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
      'name': {
        title: 'Project Name',
        type: 'string',
      },
      'address': {
        title: 'Address of Project',
        type: 'string',
      },
      client: {
        title: 'Client',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          let client = row.client;
          return client.attributes.firstName + ' ' + client.attributes.lastName;
        },
        compareFunction: (direction: any, a: any, b: any) => {
          let fullNameA = a.attributes.firstName + ' ' + a.attributes.lastName;
          let fullNameB = b.attributes.firstName + ' ' + b.attributes.lastName;
          return SmartTableService.compareFunction(direction, fullNameA, fullNameB);
        },
        filterFunction: (a?: any, search?: string) => {
          let fullName = a.attributes.firstName + ' ' + a.attributes.lastName;
          return SmartTableService.filterFunction(fullName , search);
        },
      },
      budget: {
        title: 'Budget',
        type: 'string',
      },
      'cost': {
        title: 'Cost',
        type: 'number',
      },
      'status': {
        title: 'Status',
        type: 'string',
      },
      'dueDate': {
        title: 'Due Date',
        type: 'number',
      },
      'createdAt': {
        title: 'Created',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: ProjectsService,
    private router: Router,
  ) {
    const data = this.service.getProjects();
    this.source.load(data);
    service.observableProjects.subscribe(newData => {
      this.source.load(newData.map(value => {
        return {paresObject: value, ...value.attributes, ...value.attributes.current.attributes};
      }));
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onRowSelect(event): void {

    this.service.activeProject = event.data.paresObject;
    this.router.navigate(['/tools/project', event.data.paresObject.id]);
  }

  onDelete(event): void {
    this.service.removeProject(event);
  }

  ngOnInit() {
  }

}
