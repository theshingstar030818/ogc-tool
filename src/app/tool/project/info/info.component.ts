import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
  ) {
    this.route.parent.params.subscribe( params => {
      // console.log(params);
    });
  }

  ngOnInit() {
  }

}
