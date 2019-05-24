import { Component, OnInit, Input } from '@angular/core';
// import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LineItemsService } from '../../../../@core/data/lint-tems.service';
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

  subDivisions: FormControl;
  division: FormControl;
  name: FormControl;

  constructor(
    protected lineItemsService: LineItemsService,
    protected subDivisionsService: SubDivisionsService,
    protected divisionsService: DivisionsService,
  ) {

  }

  createFormControls() {
    this.subDivisions = new FormControl([], []);
    this.division = new FormControl(this.data.subDivision? this.data.subDivision.attributes.division.id : '', Validators.required);
    this.name = new FormControl(this.data.subDivision? this.data.subDivision.attributes.name : '', Validators.required);
  }

  createForm() {
    this.subDivision = new FormGroup({
      subDivisions: this.subDivisions,
      division: this.division,
      name: this.name,
    });
  }

  ngOnInit() {
    console.log(this.data)
    this.createFormControls();
    this.createForm();
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
