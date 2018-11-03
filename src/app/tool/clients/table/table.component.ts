import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ClientsService } from '../../../@core/data/clients.service';


@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class ClientTableComponent implements OnInit {

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
      clientName: {
        title: 'Name',
        type: 'string',
      },
      clientEmail: {
        title: 'Email',
        type: 'string',
      },
      clientPhone: {
        title: 'Phone Number',
        type: 'string',
      },
      clientAddress: {
        title: 'Address',
        type: 'string',
      },
      clientProjects: {
        title: 'Projects',
        type: 'number',
      },
      created: {
        title: 'Created',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ClientsService) {
    const data = this.service.getClients();
    this.source.load(data);
    /* service.observableClients.subscribe(newData => {
      this.source.load(newData);
    }); */
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDelete(event): void {
    this.service.removeClient(event);
  }

  ngOnInit() {
  }

}
