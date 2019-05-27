import { DivisionsService } from '../../../../@core/data/divisions.service';
import { ProjectTemplatesService } from '../../../../@core/data/project-templates.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-create-project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.scss'],
})
export class CreateProjectTemplateComponent implements OnInit {

  @Input() data?: any;
  @Input() ref: any;

  projectTemplate: FormGroup;
  divisions: FormArray;
  name: FormControl;
  selectedDivisions: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    protected projectTemplatesService: ProjectTemplatesService,
    protected divisionsService: DivisionsService,
  ) { }

  createFormControls() {
    this.selectedDivisions = new FormControl([]); 
    this.divisions = this.data.template ?
    this.formBuilder.array(this.data.divisions) :
    new FormArray([], []);
    this.name = new FormControl(this.data.template ?
    this.data.template.attributes.name : '', Validators.required);
  }

  createForm() {
    this.projectTemplate = new FormGroup({
      name: this.name,
      divisions: this.divisions,
      selectedDivisions: this.selectedDivisions,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  

  save() {
    if (this.data.template) {
      console.log(this.selectedDivisions)
      this.projectTemplatesService.update(this.projectTemplate.value);
      this.ref.close();
    } else {
      if (this.projectTemplate.valid) {
        this.projectTemplatesService.add(this.projectTemplate.value);
        this.projectTemplate.reset();
        this.dismiss();
      } else {
        window.alert('Form fields are not valid');
      }
    }
  }

  dismiss() {
    this.ref.close();
  }

}
