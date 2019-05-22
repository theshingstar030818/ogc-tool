import { ProjectTemplatesService } from '../../../../@core/data/project-templates.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-create-project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.scss'],
})
export class CreateProjectTemplateComponent implements OnInit {

  @Input() title: string;
  projectTemplate: FormGroup;
  divisions: FormGroup;
  name: FormControl;

  constructor(
    protected ref: NbDialogRef<CreateProjectTemplateComponent>,
    protected projectTemplatesService: ProjectTemplatesService,
  ) { }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
  }

  createForm() {
    this.projectTemplate = new FormGroup({
      name: this.name,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onSubmit() {
    if (this.projectTemplate.valid) {
      this.projectTemplatesService.add(this.projectTemplate.value);
      this.projectTemplate.reset();
      this.dismiss();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  dismiss() {
    this.ref.close();
  }

}
