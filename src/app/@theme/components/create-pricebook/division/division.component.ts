import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { DivisionsService } from '../../../../@core/data/divisions.service';
import { SubDivisionsService } from '../../../../@core/data/subDivisions.service';

@Component({
  selector: 'ngx-create-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss'],
})
export class CreateDivisionComponent implements OnInit {

  @Input() data?: any;
  @Input() ref: any;

  subDivisions: FormArray;
  division: FormGroup;
  name: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    protected divisionsService: DivisionsService,
    protected subDivisionsService: SubDivisionsService,
  ) { }

  createFormControls() {
    this.name = new FormControl(this.data.division ?
    this.data.division.attributes.name : '', Validators.required);
    this.subDivisions = this.data.division ?
    this.formBuilder.array(this.subDivisionsService.getSubDivisions(this.data.division.id)) :
    new FormArray([], []);
  }

  createForm() {
    this.division = new FormGroup({
      name: this.name,
      subDivisions: this.subDivisions,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  save() {
    if (this.data.division) {
      this.divisionsService.update(this.division.value);
      this.ref.close();
    } else {
      if (this.division.valid) {
      this.divisionsService.add(this.division.value);
      this.division.reset();
      this.ref.close();

      } else {
        window.alert('Form fields are not valid');
      }
    }
  }

}
