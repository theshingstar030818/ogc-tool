import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './tool-menu';

@Component({
  selector: 'ngx-tool',
  templateUrl: './tool.component.html',
})
export class ToolComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor() { }

  ngOnInit() {
  }

}
