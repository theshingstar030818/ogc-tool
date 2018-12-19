import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbCardModule, NbThemeModule, NbLayoutModule, NbListModule } from '@nebular/theme';

@Component({
  selector: 'ngx-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})

@NgModule({
  imports:[
    NbThemeModule,
    NbCardModule,
    NbLayoutModule,
    NbListModule
  ],
})
export class ShareComponent implements OnInit {

  shareProjectForm: FormGroup;
  emails: FormControl;
  shared: boolean;
  sharedEmail: Array<any>;
  comment = {
    "email" : "jane.doe@gmail.com",
    "time" : "4min",
    "text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  };
  multipleEmailPattern = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/g;

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
  ) {
    this.shared = false;
    this.route.parent.params.subscribe( params => {
      // console.log(params);
    });
  }
  createFormControls() {
    this.emails = new FormControl('',[
      Validators.required,
      Validators.pattern(this.multipleEmailPattern),
    ]);
  }

  createForm() {
    this.shareProjectForm = new FormGroup({
      emails: this.emails,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  onSubmit() {
    if (this.shareProjectForm.valid) {
      var sharedEmails = this.shareProjectForm.value.emails;
      this.sharedEmail = sharedEmails.split(",");
      this.shared = true;
      this.shareProjectForm.reset();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  stopSharing(){
    this.shared = false;
  }

}
