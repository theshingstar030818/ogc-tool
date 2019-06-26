import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../@core/data/projects.service';

@Component({
  selector: 'ngx-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.projectsService.setActiveProject(params['id']);
    });
  }

}
