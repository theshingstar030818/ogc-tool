import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Parse, ParseObject } from 'parse';

@Injectable({
  providedIn: 'root',
})
export class LineItemsService {

  public lineItemsMap: any = {};
  public lineItems: Array<any> = [];
  public observablePriceBook: BehaviorSubject<any>;

  constructor() {
    this.observablePriceBook = new BehaviorSubject<any[]>(this.lineItems);
    this.fetchLineItems();
   }

   async fetchLineItems() {

    const LineItem = Parse.Object.extend('LineItem');
    const query = new Parse.Query(LineItem);
    query.limit(1000);
    const lineItems = await query.find();
    this.lineItems = lineItems;
    this.generateLineItemsMap(lineItems);
    this.observablePriceBook.next(this.lineItems);
  }

   async addLintItem(lineItem?) {
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
      let relation = subDivision.relation('lineItems');
      relation.add(saveLineItem);
      subDivision.save();
      this.lineItems.push(saveLineItem);
      this.observablePriceBook.next(this.lineItems);
    }, (error) => {
      // console.log('Failed to create new object, with error code: ' + error.message);
    });
  }

  generateLineItemsMap(lineItems: Array<ParseObject>) {
    for (let lineItem of lineItems) {
      this.lineItemsMap[lineItem['id']] = lineItem;
    }
  }

  getAllLineItems() {
    return this.lineItems;
  }

  public getLineItems(subDivisionId) {
    return this.lineItems.filter(value => value.attributes.subDivision.id === subDivisionId);
}

  removeLineItem(event) {
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

}
