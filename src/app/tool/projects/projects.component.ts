import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-projects',
  templateUrl: './projects.component.html',
})

export class ProjectsComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.paramMap.subscribe( params => {
      if (params['id']) {
        // console.log(params);
        this.router.navigate(['./info']);
      }
    });
  }

}
