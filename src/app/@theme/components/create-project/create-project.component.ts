import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  @Input() title: string;

  constructor(
    protected ref: NbDialogRef<CreateProjectComponent>
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.ref.close();
  }

}
