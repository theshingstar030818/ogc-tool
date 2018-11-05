import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ClientsService } from '../../../@core/data/clients.service';

@Component({
  selector: 'ngx-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit {

  @Input() title: string;

  constructor(
    protected ref: NbDialogRef<CreateClientComponent>,
    protected clientsService: ClientsService,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.clientsService.addClient();
    this.ref.close();
  }

}
