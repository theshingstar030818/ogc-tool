import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { DivisionsService } from '../../../../@core/data/divisions.service';
import { SubDivisionsService } from '../../../../@core/data/subDivisions.service';
@Component({
  selector: 'ngx-create-sub-division',
  templateUrl: './sub-division.component.html',
  styleUrls: ['./sub-division.component.scss'],
})

export class CreateSubDivisionComponent implements OnInit {

  @Input() data?: any;
  @Input() ref: any;

  subDivision: FormGroup;

  lineItems: FormArray;
  division: FormControl;
  name: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    protected subDivisionsService: SubDivisionsService,
    protected divisionsService: DivisionsService,
  ) { }

  createFormControls() {
    this.lineItems = this.data.subDivision ?
    this.formBuilder.array(this.subDivisionsService.getAllLineItems(this.data.subDivision.id)) :
    new FormArray([], []);
    this.division = new FormControl(this.data.subDivision ?
      this.data.subDivision.attributes.division.id : '', Validators.required);
    this.name = new FormControl(this.data.subDivision ?
      this.data.subDivision.attributes.name : '', Validators.required);
  }

  createForm() {
    this.subDivision = new FormGroup({
      lineItems: this.lineItems,
      division: this.division,
      name: this.name,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  save() {
    if (this.data.subDivision) {
      this.subDivisionsService.update(this.subDivision.value);
      this.ref.close();
    } else {
      if (this.subDivision.valid) {
        !this.data.edit ?
        this.subDivisionsService.add(this.subDivision.value) :
        this.subDivision.reset();
        this.ref.close();
      } else {
        window.alert('Form fields are not valid');
      }
    }
  }
}
