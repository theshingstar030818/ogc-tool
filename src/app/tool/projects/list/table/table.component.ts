import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ProjectsService } from '../../../../@core/data/projects.service';


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
      projectName: {
        title: 'Project Name',
        type: 'string',
      },
      projectAddress: {
        title: 'Address of Project',
        type: 'string',
      },
      client: {
        title: 'Client',
        type: 'string',
      },
      budget: {
        title: 'Budget',
        type: 'string',
      },
      cost: {
        title: 'Cost',
        type: 'number',
      },
      status: {
        title: 'Status',
        type: 'number',
      },
      dueDate: {
        title: 'Due Date',
        type: 'number',
      },
      created: {
        title: 'Created',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ProjectsService) {
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

  onDelete(event): void {
    this.service.removeProject(event);
  }

  ngOnInit() {
  }

}
