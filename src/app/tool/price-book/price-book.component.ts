import { Component, OnInit } from '@angular/core';
import { PriceBookService } from '../../@core/data/pricebook.service';

@Component({
  selector: 'ngx-price-book',
  templateUrl: './price-book.component.html',
  styleUrls: ['./price-book.component.scss'],
})
export class PriceBookComponent implements OnInit {

  constructor(
     protected pricebookService: PriceBookService,
  ) { }

  ngOnInit() {
  }

}
