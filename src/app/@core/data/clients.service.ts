import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  public clients: Array<any> = [];

  public mockClient = {
    clientName: 'John Smith',
    clientEmail: 'john.smith@g.com',
    clientPhone: '+11322158256',
    clientAddress: '201 Evergreen StVestal, NY 13850, USA',
    clientProjects: '1',
    created: '2018/06/21',
  };

  constructor() {
    this.addClient(this.mockClient);
    this.observableClients = new BehaviorSubject<any[]>(this.clients);
   }

  addClient(client?){
    this.clients.push(client);
  }

  getClients(){
    return this.clients;
  }

  removeClient(event){
    this.clients.splice(event.index, 1);
  }
}
