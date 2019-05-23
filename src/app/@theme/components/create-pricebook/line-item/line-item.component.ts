import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LineItemsService } from '../../../../@core/data/lint-tems.service';
import { SubDivisionsService } from '../../../../@core/data/subDivisions.service';
import { DivisionsService } from '../../../../@core/data/divisions.service';

@Component({
  selector: 'ngx-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss'],
})

export class CreateLineItemComponent implements OnInit {

  @Input() title: string;

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  units: string[] = ['Item1', 'Item2', 'Item3'];
  division: any;
  subDivision: any;

  lineitemForm: FormGroup;
  name: FormControl;
  price: FormControl;
  type: FormControl;
  quantity: FormControl;
  tax: FormControl;
  total: FormControl;
  divisionsFC: FormControl;
  subDivisionsFC: FormControl;
  description: FormControl;
  ogcNotes: FormControl;

  constructor(
    protected ref: NbDialogRef<CreateLineItemComponent>,
    protected lineItemsService: LineItemsService,
    protected subDivisionsService: SubDivisionsService,
    protected divisionsService: DivisionsService,
  ) {
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.price = new FormControl('', Validators.required);
    this.type = new FormControl('', Validators.required);
    this.quantity = new FormControl('', Validators.required);
    this.tax = new FormControl('', Validators.required);
    this.total = new FormControl('', Validators.required);
    this.divisionsFC = new FormControl('', Validators.required);
    this.subDivisionsFC = new FormControl('', Validators.required);
    this.description = new FormControl('');
    this.ogcNotes = new FormControl('');
  }

  createForm() {
    this.lineitemForm = new FormGroup({
      name: this.name,
      price: this.price,
      type: this.type,
      quantity: this.quantity,
      tax: this.tax,
      total: this.total,
      divisionsFC: this.divisionsFC,
      subDivisionsFC: this.subDivisionsFC,
      description: this.description,
      ogcNotes: this.ogcNotes,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.division = this.divisionsService.getDivisions();
  }

  onSubmit() {
    if (this.lineitemForm.valid) {
      this.lineItemsService.addLintItem(this.lineitemForm.value);
      this.lineitemForm.reset();
      this.dismiss();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  dismiss() {
    this.ref.close();
  }

  getSubDivision($event, divisionId) {
    this.subDivisionsFC.reset();
    if (divisionId !== '') {
      this.subDivision = this.subDivisionsService.getSubDivisions(divisionId);
    }
  }
}
