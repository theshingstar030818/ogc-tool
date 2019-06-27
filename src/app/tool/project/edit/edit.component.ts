import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ProjectsService } from '../../../@core/data/projects.service';
import { ClientsService } from '../../../@core/data/clients.service';
import { ParseObject } from 'parse';
import { LineItemsService } from '../../../@core/data/line-items.service';

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
    public route: ActivatedRoute,
    public projectsService: ProjectsService,
    public clientsService: ClientsService,
    public lineItemsService: LineItemsService,
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
    this.projectName = new FormControl(
      this.projectsService.activeProject.get('current').get('name'), Validators.required);
    this.revisionDate = new FormControl(
      this.projectsService.activeProject.attributes.current.updatedAt, Validators.required);
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
    lineItem['total'] = (lineItem.material ? lineItem.material : 0) * (lineItem.qty ? lineItem.qty : 0) ;
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
      total += (lineItem['total'] ? lineItem['total'] : 0);
    });
    // console.log('subdivison total : ' + total);
    return total;
  }

  calculateDivisionTotal(division) {
    let total = 0;
    division['subdivisions'].forEach(function (subDivision) {
      // console.log(subDivision['total']);
      if (subDivision['total']) {
        total += (subDivision['total'] ? subDivision['total'] : 0);
      }
    });
    // console.log('divison total : ' + total);
    return total;
  }

  public printActiveProject() {
    // console.log(this.projectsService.activeProject);
  }

  async saveProject() {
    let project: ParseObject = await this.projectsService.getPtoject(this.projectsService.activeProject.id);
    let newVersionCount = project.get("maxVersionCount")+1;
    let newProject = this.projectsService.activeProject.attributes.current.clone();
    newProject.set("version", newVersionCount);
    newProject = await newProject.save();

    project.set("maxVersionCount", newVersionCount);
    project.set("current", newProject);
    let relationHistory = project.relation('history');
    relationHistory.add(newProject);
    project = await project.save();

  }

}
