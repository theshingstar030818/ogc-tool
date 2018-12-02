import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  public clients: Array<any> = [];
  public observableClients: BehaviorSubject<any>;

  constructor() {
    this.observableClients = new BehaviorSubject<any[]>(this.clients);
    this.getClientsParse();

  }

  async getClientsParse(){

    const Clients = Parse.Object.extend("Client");
    const query = new Parse.Query(Clients);
    const results = await query.find();
    // Do something with the returned Parse.Object values

    for (let i = 0; i < results.length; i++) {
      var object = results[i];

      this.clients.push(object);
      // console.log(object);
      this.observableClients.next(this.clients);
/*
      var client: any = {
        id: object.id,
        name: object.get('firstName')+" "+object.get('lastName'),
        email: object.get('email'),
        phone: object.get('phone'),
        address: object.get('address'),
        projects: '1',
        created: object.get('createdAt'),
      };

      this.clients.push(client);
      this.observableClients.next(this.clients);*/
    }
  }

  addClient(client?) {

    const Client = Parse.Object.extend("Client");
    const clientData = new Client();

    clientData.set("firstName", client.name.firstName);
    clientData.set("lastName", client.name.lastName);
    clientData.set("email", client.email);
    clientData.set("phone", client.phone);
    clientData.set("address", client.address);

    clientData.save().then((clientData) => {
      // Execute any logic that should take place after the object is saved.
      /* console.log(clientData);
      client.id = clientData.id;
      client.name = client.name.firstName + ' ' + client.name.lastName;
      client.projects = '1'; */
      this.clients.push(clientData);
      this.observableClients.next(this.clients);

    }, (error) => {
      // console.log('Failed to create new object, with error code: ' + error.message);
    });
  }

  getClients() {
    return this.clients;
  }

  removeClient(event) {
    const Client = Parse.Object.extend("Client");
    const clientData = new Client();
    clientData.id = event.data.id;
    clientData.destroy().then((results) => {
      // The object was deleted from the Parse Cloud.
      // console.log(results);
      this.clients.splice(event.index, 1);
      this.observableClients.next(this.clients);

    }, (error) => {
      // console.log(error);
    });
  }
}
