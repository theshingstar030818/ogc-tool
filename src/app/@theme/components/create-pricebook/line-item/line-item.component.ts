import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PriceBookService } from '../../../../@core/data/pricebook.service';

@Component({
  selector: 'ngx-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss'],
})

export class CreateLineItemComponent implements OnInit {

  @Input() title: string;

  constructor(
    protected ref: NbDialogRef<CreateLineItemComponent>,
    protected pricebookService: PriceBookService,
  ) { }

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

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.price = new FormControl('', Validators.required);
    this.type = new FormControl('', Validators.required);
    this.quantity = new FormControl('', Validators.required);
    this.tax = new FormControl('', Validators.required);
    this.total = new FormControl('', Validators.required);
  }

  createForm() {
    this.lineitemForm = new FormGroup({
      name: this.name,
      price: this.price,
      type: this.type,
      quantity: this.quantity,
      tax: this.tax,
      total: this.total,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.pricebookService.getDivisions().then((results) => {

      this.division = results;

    }, (error) => {
      // console.log(error);
    });
  }

  onSubmit() {
    if (this.lineitemForm.valid) {
      this.pricebookService.addPriceBookLineItem(this.lineitemForm.value);
      this.lineitemForm.reset();
      this.dismiss();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  dismiss() {
    this.ref.close();
  }

  getSubDivision($event, division) {
    if (division !== '') {
      this.pricebookService.getSubDivisions(division).then((results) => {

        this.subDivision = results;

      }, (error) => {
        // console.log(error);
      });
    }
  }
}
