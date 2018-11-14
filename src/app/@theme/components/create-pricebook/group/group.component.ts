import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PriceBookService } from '../../../../@core/data/pricebook.service';

@Component({
  selector: 'ngx-line-item-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})

export class CreateLineItemGroupComponent implements OnInit {

  @Input() title: string;

  constructor(
    protected ref: NbDialogRef<CreateLineItemGroupComponent>,
    protected pricebookService: PriceBookService,
  ) { }

  lineitemGroupForm: FormGroup;
  groupName: FormControl;
  lineItems: FormControl;
  items: string[] = ['item1', 'item2', 'item3'];


  createFormControls() {
    this.groupName = new FormControl('', Validators.required);
    this.lineItems = new FormControl('', Validators.required);
  }

  createForm() {
    this.lineitemGroupForm = new FormGroup({
      groupName: this.groupName,
      lineItems: this.lineItems,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.items = this.pricebookService.getPriceBook();
  }

  onSubmit() {
    if (this.lineitemGroupForm.valid) {
      this.pricebookService.addPriceBookGroup(this.lineitemGroupForm.value);
      this.lineitemGroupForm.reset();
      this.dismiss();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  dismiss() {
    this.ref.close();
  }
}
