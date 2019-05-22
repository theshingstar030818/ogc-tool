import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DivisionsService } from '../../../../@core/data/divisions.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss'],
})
export class CreateDivisionComponent implements OnInit {

  @Input() title: string;
  division: FormGroup;
  name: FormControl;

  constructor(
    protected ref: NbDialogRef<CreateDivisionComponent>,
    protected divisionsService: DivisionsService,
  ) { }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
  }

  createForm() {
    this.division = new FormGroup({
      name: this.name,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onSubmit() {
    if (this.division.valid) {
      this.divisionsService.add(this.division.value);
      this.division.reset();
      this.dismiss();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  dismiss() {
    this.ref.close();
  }

}
