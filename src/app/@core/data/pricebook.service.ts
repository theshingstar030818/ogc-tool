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

   addPriceBookLineItem(lineItem?) {

    const SubDivision = Parse.Object.extend('SubDivision');
    const LineItem = Parse.Object.extend('LineItem');
    const LineItemData = new LineItem();

    var pointer = SubDivision.createWithoutData(lineItem.subDivisionsFC);

    LineItemData.set('title', lineItem.name);
    LineItemData.set('material', lineItem.price);
    LineItemData.set('unitType', lineItem.type);
    LineItemData.set('qty', lineItem.quantity);
    LineItemData.set('tax', lineItem.tax);
    LineItemData.set('total', lineItem.total);
    LineItemData.set('subDivision', pointer);

    LineItemData.setACL(new Parse.ACL(Parse.User.current()));

    LineItemData.save().then((result) => {
      // Execute any logic that should take place after the object is saved.
      this.pricebooks.push(result);
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
    const LineItem = Parse.Object.extend('LineItem');
    const LineItemData = new LineItem();
    LineItemData.id = event.data.id;
    LineItemData.destroy().then((results) => {
      // The object was deleted from the Parse Cloud.
      this.pricebooks.splice(event.index, 1);
      this.observablePriceBook.next(this.pricebooks);

    }, (error) => {
      // console.log(error);
    });
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
