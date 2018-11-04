import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  public clients: Array<any> = [];
  public observableClients: BehaviorSubject<any>;

  public mockClient = {
    clientName: 'John Smith',
    clientEmail: 'john.smith@g.com',
    clientPhone: '+11322158256',
    clientAddress: '201 Evergreen StVestal, NY 13850, USA',
    clientProjects: '1',
    created: '2018/06/21',
  };

  constructor() {
    this.observableClients = new BehaviorSubject<any[]>(this.clients);
    this.addClient(this.mockClient);
   }

  addClient(client?) {
    this.clients.push(client);
    this.observableClients.next(this.clients);
  }

  getClients() {
    return this.clients;
  }

  removeClient(event) {
    this.clients.splice(event.index, 1);
    this.observableClients.next(this.clients);
  }
}
