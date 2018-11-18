import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {

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
