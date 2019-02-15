import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../@core/data/projects.service';

@Component({
  selector: 'ngx-header-project',
  templateUrl: './header-project.component.html',
  styleUrls: ['./header-project.component.scss'],
})
export class HeaderProjectComponent implements OnInit {

  params: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public projectsService: ProjectsService,
  ) {
    this.route.params.subscribe( params => {
      this.params = params;
    });
  }

  ngOnInit() {
  }

  goTo(url) {
    this.route.params.subscribe( params => {
      this.router.navigate(['/tools/project/', params.id, url.toLowerCase()]);
    });
  }
}
