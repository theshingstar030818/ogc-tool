import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NbDialogRef } from '@nebular/theme';
import { ProjectsService } from '../../../@core/data/projects.service';

@Component({
  selector: 'ngx-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  @Input() title: string;

  constructor(
    protected ref: NbDialogRef<CreateProjectComponent>,
    protected projectsService: ProjectsService
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.projectsService.addProject();
    this.ref.close();
  }

}
