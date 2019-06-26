import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ProjectsService } from '../../../@core/data/projects.service';
import { ClientsService } from '../../../@core/data/clients.service';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})

@NgModule({
  imports: [
    FormsModule,
  ],
  declarations: [
  ],
})
export class EditComponent implements OnInit {

  clients: any;

  projectEditForm: FormGroup;
  drawingNo: FormControl;
  projectName: FormControl;
  revisionDate: FormControl;
  estimatedBy: FormControl;
  jobName: FormControl;
  client: FormControl;
  signatureDate: FormControl;
  agent: FormControl;

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
  ) {
    this.clientsService.observableClients.subscribe(newClients => {
      this.clients = newClients;
    });
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
    this.client = new FormControl('', Validators.required);
    this.signatureDate = new FormControl('', Validators.required);
    this.agent = new FormControl('', Validators.required);
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
      client: this.client,
      signatureDate: this.signatureDate,
      agent: this.agent,
    });
    // console.log(this.projectEditForm);
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      let projectId = params['id'];
      if (!this.projectsService.activeProject) {
        this.projectsService.setActiveProject(projectId).then(() => {
          this.createFormControls();
          this.createForm();
        });
      } else {
        this.createFormControls();
        this.createForm();
      }
    });
  }

  onSubmit() {
    if (this.projectEditForm.valid) {
      this.projectEditForm.reset();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  updateTotal(lineItem, subDivision, division) {
    lineItem['total'] = lineItem.material * lineItem.qty;
    subDivision['total'] = this.calculateSubDivisionTotal(subDivision);
    division['total'] = this.calculateDivisionTotal(division);
    // console.log(division);
    // console.log(subDivision);
    // console.log(lineItem);
  }

  calculateSubDivisionTotal(subDivision) {
    let total = 0;
    subDivision['lineItems'].forEach(function (lineItem) {
      // console.log(lineItem['total']);
      total += lineItem['total'];
    });
    // console.log('subdivison total : ' + total);
    return total;
  }

  calculateDivisionTotal(division) {
    let total = 0;
    division['subdivisions'].forEach(function (subDivision) {
      // console.log(subDivision['total']);
      if (subDivision['total']) {
        total += subDivision['total'];
      }
    });
    // console.log('divison total : ' + total);
    return total;
  }

  public printActiveProject() {
    // console.log(this.projectsService.activeProject);
  }

  public saveProject() {
    // console.log(this.projectsService.activeProject);
    let newVersion = this.projectsService.activeProject.attributes.current.clone();
    newVersion.save().then((newProjectHistoryObj) => {
      // console.log(newProjectHistoryObj);
    });
  }

}
