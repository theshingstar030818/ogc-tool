import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  public clients: Array<any> = [];
  public observableClients: BehaviorSubject<any>;

  public mockClient = {
    name: 'John Smith',
    email: 'john.smith@g.com',
    phone: '+11322158256',
    address: '201 Evergreen StVestal, NY 13850, USA',
    projects: '1',
    created: '2018/06/21',
  };

  constructor() {
    this.observableClients = new BehaviorSubject<any[]>(this.clients);
    //this.addClient(this.mockClient);
   }

  addClient(client?) {

    client.name = client.name.firstName+" "+client.name.lastName;
    client.projects = "10";
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
