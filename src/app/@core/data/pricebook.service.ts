import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root',
})
export class PriceBookService {

  public lineItems: Array<any> = [];
  public observablePriceBook: BehaviorSubject<any>;

  constructor() {
    this.observablePriceBook = new BehaviorSubject<any[]>(this.lineItems);
    this.getLineItems();
   }

   async getLineItems() {

    const LineItem = Parse.Object.extend('LineItem');
    const query = new Parse.Query(LineItem);
    query.limit(1000);
    const lineItems = await query.find();
    this.lineItems = lineItems;
    this.observablePriceBook.next(this.lineItems);
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
    lineItemObject.set('description', lineItem.description);
    lineItemObject.set('ogcNotes', lineItem.ogcNotes);

    lineItemObject.setACL(new Parse.ACL(Parse.User.current()));
    lineItemObject.save().then((saveLineItem) => {
      // Execute any logic that should take place after the object is saved.
      let relation = subDivision.relation('lineItems');
      relation.add(saveLineItem);
      subDivision.save();
      this.lineItems.push(saveLineItem);
      this.observablePriceBook.next(this.lineItems);
    }, (error) => {
      // console.log('Failed to create new object, with error code: ' + error.message);
    });
  }

  getPriceBook() {
    return this.lineItems;
  }

  removePriceBook(event) {
    if (confirm('Are You Sure You Want to Delete This Line Item?')) {
      const LineItem = Parse.Object.extend('LineItem');
      const lineItemObject = new LineItem();
      lineItemObject.id = event.data.id;
      lineItemObject.destroy().then((results) => {
        this.lineItems.splice(event.index, 1);
        this.observablePriceBook.next(this.lineItems);
      }, (error) => {
        // console.log(error);
      });
    }
  }

  async getDivisions() {
    const Division = Parse.Object.extend('Division');
    const query = new Parse.Query(Division);
    query.limit(1000);
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
    query.limit(1000);
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
