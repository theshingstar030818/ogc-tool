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

  async getClientsParse() {

    const Clients = Parse.Object.extend('Client');
    const query = new Parse.Query(Clients);
    const results = await query.find();
    // Do something with the returned Parse.Object values

    this.clients = results;
    this.observableClients.next(this.clients);
  }

  addClient(client?) {

    const Client = Parse.Object.extend('Client');
    const clientData = new Client();

    clientData.set('firstName', client.name.firstName);
    clientData.set('lastName', client.name.lastName);
    clientData.set('email', client.email);
    clientData.set('phone', client.phone);
    clientData.set('address', client.address);

    clientData.setACL(new Parse.ACL(Parse.User.current()));

    clientData.save().then((result) => {
      // Execute any logic that should take place after the object is saved.
      this.clients.push(result);
      this.observableClients.next(this.clients);

    }, (error) => {
      // console.log('Failed to create new object, with error code: ' + error.message);
    });
  }

  getClients() {
    return this.clients;
  }

  removeClient(event) {
    const Client = Parse.Object.extend('Client');
    const clientData = new Client();
    clientData.id = event.data.id;
    clientData.destroy().then((results) => {
      // The object was deleted from the Parse Cloud.
      this.clients.splice(event.index, 1);
      this.observableClients.next(this.clients);

    }, (error) => {
      // console.log(error);
    });
  }
}
