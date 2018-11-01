import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { Router } from '@angular/router';
import { CreateProjectComponent } from '../create-project/create-project.component';

@Component({
  selector: 'ngx-header-projects',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderProjectComponent {

  constructor(
    private router: Router,
    private dialogService: NbDialogService,
  ) { }

  goTo(url) {
    this.router.navigate(['/tools/projects/' + url.toLowerCase()]);
  }

  createProject() {
    this.dialogService.open(CreateProjectComponent, {
      context: {
        title: 'Create Project',
      },
      closeOnBackdropClick: false,
    });
  }
}
