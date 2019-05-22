import {
  CreateProjectTemplateComponent,
} from '../../../@theme/components/create-pricebook/project-template/project-template.component';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { ProjectTemplatesService } from '../../../@core/data/project-templates.service';

@Component({
  selector: 'ngx-project-templates',
  templateUrl: './project-templates.component.html',
  styleUrls: ['./project-templates.component.scss'],
})
export class ProjectTemplatesComponent implements OnInit {

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
    private projectTemplatesService: ProjectTemplatesService,
  ) {
    const data = this.projectTemplatesService.getProjectTemplates();
    this.source.load(data);
    projectTemplatesService.observableProjectTemplates.subscribe(newData => {
      this.source.load(newData);
    });
  }

  ngOnInit() {
  }

  deleteConfirm(event): void {
    this.projectTemplatesService.deleteProjectTemplate(event);
  }

  createProjectTemplate() {
    this.dialogService.open(CreateProjectTemplateComponent, {
      context: {
        title: 'Create New Project Template',
      },
      closeOnBackdropClick: false,
    });
  }

}
