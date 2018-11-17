import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {

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
