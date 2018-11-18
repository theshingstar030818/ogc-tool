import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../@core/data/clients.service';

@Component({
  selector: 'ngx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {

  constructor(
    public clientService: ClientsService,
  ) { }

  ngOnInit() {
  }
}
