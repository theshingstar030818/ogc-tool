import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { ProjectTemplatesService } from '../../../@core/data/project-templates.service';
import { DivisionsService } from '../../../@core/data/divisions.service';

@Component({
  selector: 'ngx-project-templates',
  templateUrl: './project-templates.component.html',
  styleUrls: ['./project-templates.component.scss'],
})
export class ProjectTemplatesComponent implements OnInit {

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
    private projectTemplatesService: ProjectTemplatesService,
    private divisionsService: DivisionsService,
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

  async onEdit(event, dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: {
        edit: true,
        title: 'Edit Template',
        buttonText: 'Save',
        template: event.data,
        divisions: await this.divisionsService.getDivisionsByTemplate(event.data),
      },
      closeOnBackdropClick: true,
      hasScroll: true,
    });
  }

  createProjectTemplate(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: {
        title: 'Create Project Template',
        buttonText: 'Create',
      },
      closeOnBackdropClick: true,
    });
  }

}
