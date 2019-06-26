import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../@core/data/projects.service';

@Component({
  selector: 'ngx-header-project',
  templateUrl: './header-project.component.html',
  styleUrls: ['./header-project.component.scss'],
})
export class HeaderProjectComponent implements OnInit {

  params: any;

  constructor(
    public projectsService: ProjectsService,
  ) {}

  ngOnInit() {
  }

}
