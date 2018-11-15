import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from '../../../@core/data/clients.service';

@Component({
  selector: 'ngx-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})

export class CreateClientComponent implements OnInit {

  @Input() title: string;

  constructor(
    protected ref: NbDialogRef<CreateClientComponent>,
    protected clientsService: ClientsService,
  ) { }

  clientsForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phone: FormControl;
  address: FormControl;
  projects: FormControl;
  created: FormControl;

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*'),
    ]);
    this.phone = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.created = new FormControl('');
    this.projects = new FormControl('');
  }

  createForm() {
    this.clientsForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email,
      phone: this.phone,
      address: this.address,
      created: this.created,
      projects: this.projects,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onSubmit() {
    if (this.clientsForm.valid) {
      this.clientsForm.controls['created'].setValue(new Date());
      this.clientsForm.controls['projects'].setValue(0);
      this.clientsService.addClient(this.clientsForm.value);
      this.clientsForm.reset();
      this.dismiss();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  dismiss() {
    this.ref.close();
  }

}
