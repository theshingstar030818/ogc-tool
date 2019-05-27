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
    // private router: Router,
  ) {
    this.init()
  }

  ngOnInit() { }

  async init(){
    let param;
    await this.route.paramMap.subscribe( params => {
      param = params;
      console.log(params);
    });
    let project = await this.projectsService.getPtoject(param['id']);
    console.log(project)
  }

}
