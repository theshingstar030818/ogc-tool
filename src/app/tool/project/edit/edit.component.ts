import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectsService } from '../../../@core/data/projects.service';
import { ClientsService } from '../../../@core/data/clients.service';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  clients: any;

  projectEditForm: FormGroup;
  drawingNo: FormControl;
  projectName: FormControl;
  revisionDate: FormControl;
  estimatedBy: FormControl;
  jobName: FormControl;

  lineItemTitle: FormControl;
  lineItemQty: FormControl;
  lineItemUnitType: FormControl;
  lineItemMaterial: FormControl;
  lineItemTrade: FormControl;
  lineItemDescription: FormControl;
  lineItemOgcNotes: FormControl;
  lineItemTotal: FormControl;
  lineItemClientTotal: FormControl;

  constructor(
    private route: ActivatedRoute,
    public projectsService: ProjectsService,
    private clientsService: ClientsService,
    // private router: Router,
  ) {
    this.route.parent.params.subscribe( params => {
      // console.log(params);
    });
  }

  createFormControls() {
    this.drawingNo = new FormControl('', Validators.required);
    this.projectName = new FormControl('', Validators.required);
    this.revisionDate = new FormControl('', Validators.required);
    this.estimatedBy = new FormControl('', Validators.required);
    this.lineItemTitle = new FormControl('', Validators.required);
    this.lineItemQty = new FormControl('', Validators.required);
    this.lineItemUnitType = new FormControl('', Validators.required);
    this.lineItemMaterial = new FormControl('', Validators.required);
    this.lineItemTrade = new FormControl('', Validators.required);
    this.lineItemDescription = new FormControl('', Validators.required);
    this.lineItemOgcNotes = new FormControl('', Validators.required);
    this.lineItemTotal = new FormControl('', Validators.required);
    this.lineItemClientTotal = new FormControl('', Validators.required);
    this.jobName = new FormControl('', Validators.required);
  }

  createForm() {
    this.projectEditForm = new FormGroup({
      drawingNo: this.drawingNo,
      projectName: this.projectName,
      revisionDate: this.revisionDate,
      estimatedBy: this.estimatedBy,
      lineItemTitle: this.lineItemTitle,
      lineItemQty: this.lineItemQty,
      lineItemUnitType: this.lineItemUnitType,
      lineItemMaterial: this.lineItemMaterial,
      lineItemTrade: this.lineItemTrade,
      lineItemDescription: this.lineItemDescription,
      lineItemOgcNotes: this.lineItemOgcNotes,
      lineItemTotal: this.lineItemTotal,
      lineItemClientTotal: this.lineItemClientTotal,
      jobName: this.jobName,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.clientsService.observableClients.subscribe(newClients => {
      this.clients = newClients;
    });
  }

  onSubmit() {
    if (this.projectEditForm.valid) {
      this.projectEditForm.reset();

    } else {
      window.alert('Form fields are not valid');
    }
  }

}
