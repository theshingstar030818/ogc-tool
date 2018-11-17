import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.parent.params.subscribe( params => {
      console.log(params)
    })
  }

  ngOnInit() {
  }

}
