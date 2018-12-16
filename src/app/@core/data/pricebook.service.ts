import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root',
})
export class PriceBookService {

  public pricebooks: Array<any> = [];
  public observablePriceBook: BehaviorSubject<any>;

  constructor() {
    this.observablePriceBook = new BehaviorSubject<any[]>(this.pricebooks);
    this.getLineItems();
   }

   async getLineItems() {

    const LineItem = Parse.Object.extend('LineItem');
    const query = new Parse.Query(LineItem);
    const results = await query.find();
    // Do something with the returned Parse.Object values

    this.pricebooks = results;
    this.observablePriceBook.next(this.pricebooks);
  }

   async addPriceBookLineItem(lineItem?) {


    const LineItem = Parse.Object.extend('LineItem');
    const lineItemObject = new LineItem();


    const SubDivisionObject = Parse.Object.extend('SubDivision');
    let querySubDivision = new Parse.Query(SubDivisionObject);
    let subDivision = await querySubDivision.get(lineItem.subDivisionsFC);

    lineItemObject.set('title', lineItem.name);
    lineItemObject.set('material', lineItem.price);
    lineItemObject.set('unitType', lineItem.type);
    lineItemObject.set('qty', lineItem.quantity);
    lineItemObject.set('tax', lineItem.tax);
    lineItemObject.set('total', lineItem.total);
    lineItemObject.set('subDivision', subDivision);

    lineItemObject.setACL(new Parse.ACL(Parse.User.current()));
    lineItemObject.save().then((saveLineItem) => {
      // Execute any logic that should take place after the object is saved.
      let relation = subDivision.relation('lineItems');
      relation.add(saveLineItem);
      subDivision.save();
      this.pricebooks.push(saveLineItem);
      this.observablePriceBook.next(this.pricebooks);
    }, (error) => {
      // console.log('Failed to create new object, with error code: ' + error.message);
    });
  }

  addPriceBookGroup(group?) {

  }

  getPriceBook() {
    return this.pricebooks;
  }

  removePriceBook(event) {
    var r = confirm("Are You Sure You Want to Delete This Line Item?");
    if (r == true) {
      const LineItem = Parse.Object.extend('LineItem');
      const lineItemObject = new LineItem();
      lineItemObject.id = event.data.id;
      lineItemObject.destroy().then((results) => {
        // The object was deleted from the Parse Cloud.
        this.pricebooks.splice(event.index, 1);
        this.observablePriceBook.next(this.pricebooks);

      }, (error) => {
        // console.log(error);
      });
    }
  }

  async getDivisions() {
    const Division = Parse.Object.extend('Division');
    const query = new Parse.Query(Division);
    const results = await query.find();
    let divisions: Array<any> = [];
    for (let i = 0; i < results.length; i++) {
      let object = results[i];

      let eachDivision = {
          'id': object.id,
          'name': object.get('name'),
      };
      divisions.push(eachDivision);
    }
    return divisions;
  }

  async getSubDivisions(division?) {

    const Division = Parse.Object.extend('Division');
    let divisionObject = new Division();
    divisionObject.id = division;

    const SubDivision = Parse.Object.extend('SubDivision');
    const query = new Parse.Query(SubDivision);
    query.equalTo('division', divisionObject);
    const results = await query.find();
    let subDivisions: Array<any> = [];
    for (let i = 0; i < results.length; i++) {
      let object = results[i];

      let eachSubDivision = {
          'id': object.id,
          'name': object.get('name'),
      };
      subDivisions.push(eachSubDivision);
    }
    return subDivisions;
  }
}
