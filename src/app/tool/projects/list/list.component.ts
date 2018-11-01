import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../@core/data/projects.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  constructor(
    protected projectsService: ProjectsService,
  ) { }

  ngOnInit() {
  }

}
