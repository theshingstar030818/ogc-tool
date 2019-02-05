import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ProjectsService } from '../../../../@core/data/projects.service';
import { Router } from '@angular/router';


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
      'name': {
        title: 'Project Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.current.attributes.name;
        },
      },
      projectAddress: {
        title: 'Address of Project',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.current.attributes.address;
        },
      },
      client: {
        title: 'Client',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          let client = row.attributes.current.attributes.client.attributes;
          return client.firstName + ' ' + client.lastName;
        },
      },
      budget: {
        title: 'Budget',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.current.attributes.budget;
        },
      },
      cost: {
        title: 'Cost',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.current.attributes.cost;
        },
      },
      status: {
        title: 'Status',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.current.attributes.status;
        },
      },
      dueDate: {
        title: 'Due Date',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.attributes.current.attributes.dueDate;
        },
      },
      created: {
        title: 'Created',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.createdAt;
        },
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

  onRowSelect(event): void {
    this.router.navigate(['/tools/project', event.data.id]);
  }

  onDelete(event): void {
    //this.service.removeProject(event);
  }

  ngOnInit() {
  }

}
