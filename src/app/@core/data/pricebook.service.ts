import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class PriceBookService {

  public pricebooks: Array<any> = [];
  public observablePriceBook: BehaviorSubject<any>;

  public mockPriceBook = {
    name: 'sample line item',
    price: '1.00',
    type: 'Item',
    quantity: '1',
    tax: '1',
    total: '1',
  };

  constructor() {
    this.observablePriceBook = new BehaviorSubject<any[]>(this.pricebooks);
    this.addPriceBookLineItem(this.mockPriceBook);
   }

   addPriceBookLineItem(lineItem?) {

    this.pricebooks.push(lineItem);
    this.observablePriceBook.next(this.pricebooks);
  }

  addPriceBookGroup(group?) {

  }

  getPriceBook() {
    return this.pricebooks;
  }

  removePriceBook(event) {
    this.pricebooks.splice(event.index, 1);
    this.observablePriceBook.next(this.pricebooks);
  }
}
