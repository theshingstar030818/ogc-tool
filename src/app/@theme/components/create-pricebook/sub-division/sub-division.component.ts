import { Component, OnInit, Input } from '@angular/core';
// import { NbDialogRef } from '@nebular/theme';
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
    this.lineItems = new FormArray([], []);
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
    if(this.data.subDivision) {
      console.log(this.subDivisionsService.getAllLineItems(this.data.subDivision.id));
      // this.lineItems.setValue(this.subDivisionsService.getAllLineItems(this.data.subDivision.id));
      this.lineItems = this.formBuilder.array(this.subDivisionsService.getAllLineItems(this.data.subDivision.id));
      console.log(this.lineItems.controls)
    }
  }

  onSubmit() {
    if (this.subDivision.valid) {
      !this.data.edit ?
      this.subDivisionsService.add(this.subDivision.value) :
      this.subDivisionsService.update(this.subDivision.value);
      this.subDivision.reset();
      this.ref.close();

    } else {
      window.alert('Form fields are not valid');
    }
  }
}
