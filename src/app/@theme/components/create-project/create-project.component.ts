import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectsService } from '../../../@core/data/projects.service';
import { ClientsService } from '../../../@core/data/clients.service';

@Component({
  selector: 'ngx-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {

  @Input() title: string;

  templates: any;
  clients: any;

  projectForm: FormGroup;
  name: FormControl;
  address: FormControl;
  client: FormControl;
  duedate: FormControl;
  template: FormControl;
  status: FormControl;

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.client = new FormControl('', Validators.required);
    this.duedate = new FormControl('', Validators.required);
    this.template = new FormControl('', Validators.required);
    this.status = new FormControl('');
  }

  createForm() {
    this.projectForm = new FormGroup({
      name: this.name,
      address: this.address,
      client: this.client,
      duedate: this.duedate,
      template: this.template,
      status: this.status,
    });
  }

  constructor(
    protected ref: NbDialogRef<CreateProjectComponent>,
    protected projectsService: ProjectsService,
    private clientsService: ClientsService,
  ) {
    this.clientsService.observableClients.subscribe(newClients => {
      this.clients = newClients;
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.projectsService.getTemplates().then((results) => {
      // console.log(results);
      this.templates = results;
    }, (error) => {
      // console.log(error);
    });
  }

  async onSubmit() {

    // let devisions = await this.fetchTemplateDivisions(this.template.value);
    // console.log(devisions);

    if (this.projectForm.valid) {
      this.projectForm.controls['status'].setValue('New');
      this.projectsService.addProject(this.projectForm.value);
      this.projectForm.reset();
      this.dismiss();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  async fetchTemplateDivisions(templates) {
    let relationdivisions = templates[0].relation('divisions');
    let querydivisions = relationdivisions.query();
    let division = await querydivisions.find();
    for (let i = 0; i < division.length; i++) {
      let subDivisions = await this.fetchTemplateSubDivisions(division[i].relation('subDivisions'));

      division[i] = {
        'parseObject': division[i],
        'subDivisions' : subDivisions,
      };
    }
    return division;
  }

  async fetchTemplateSubDivisions(relationSubDivisions) {

    let querySubDivisions = relationSubDivisions.query();
    let resultSubDivisions = await querySubDivisions.find();

    for (let i = 0; i < resultSubDivisions.length; i++) {
      let lineItems = await this.fetchTemplateLineItems(resultSubDivisions[i].relation('lineItems'));

      resultSubDivisions[i] = {
        'parseObject': resultSubDivisions[i],
        'lineItems' : lineItems,
      };
    }

    // console.log(resultSubDivisions);
    return resultSubDivisions;
  }

  async fetchTemplateLineItems(relationLineItems) {
    let queryLineItems = relationLineItems.query();
    return await queryLineItems.find();
  }

  dismiss() {
    this.ref.close();
  }

}
