import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
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

  @Input() title: string;

  subDivision: FormGroup;

  division: FormControl;
  name: FormControl;

  constructor(
    protected ref: NbDialogRef<CreateSubDivisionComponent>,
    protected lineItemsService: LineItemsService,
    protected subDivisionsService: SubDivisionsService,
    protected divisionsService: DivisionsService,
  ) {
  }

  createFormControls() {
    this.division = new FormControl('', Validators.required);
    this.name = new FormControl('', Validators.required);
  }

  createForm() {
    this.subDivision = new FormGroup({
      division: this.division,
      name: this.name,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onSubmit() {
    if (this.subDivision.valid) {
      this.subDivisionsService.add(this.subDivision.value);
      this.subDivision.reset();
      this.dismiss();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  dismiss() {
    this.ref.close();
  }
}
