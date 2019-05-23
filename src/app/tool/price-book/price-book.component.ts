import { Component, OnInit } from '@angular/core';
import { LineItemsService } from '../../@core/data/lint-tems.service';

@Component({
  selector: 'ngx-price-book',
  templateUrl: './price-book.component.html',
  styleUrls: ['./price-book.component.scss'],
})
export class PriceBookComponent implements OnInit {

  constructor(
     public lineItemsService: LineItemsService,
  ) { }

  ngOnInit() {
  }

}
