import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ProjectsService } from '../../../@core/data/projects.service';

@Component({
  selector: 'ngx-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {

  @Input() title: string;

  template: any;

  constructor(
    protected ref: NbDialogRef<CreateProjectComponent>,
    protected projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.projectsService.getTemplates().then((results) => {
      this.template = results;
    }, (error) => {
      // console.log(error);
    });
  }

  dismiss() {
    this.projectsService.addProject();
    this.ref.close();
  }

}
