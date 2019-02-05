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

  onSubmit() {
    // console.log(this.projectForm);
    this.fetchTemplateDivisions(this.template.value);
    // if (this.projectForm.valid) {
    //   this.projectForm.controls['status'].setValue('New');
    //   this.projectsService.addProject(this.projectForm.value);
    //   this.projectForm.reset();
    //   this.dismiss();

    // } else {
    //   window.alert('Form fields are not valid');
    // }
  }

  async fetchTemplateDivisions(templates) {
    // console.log(templates);

    let relationdivisions = templates[0].relation('divisions');
    let querydivisions = relationdivisions.query();
    await querydivisions.find().then((division) => {

      for (let i = 0; i < division.length; i++) {

        // console.log(division[i].toJSON());

        this.fetchTemplateSubDivisions(division[i].relation('subDivisions'));
        // .then((subDivisions) => {

          // console.log(subDivisions);

        // });
      }

    }, (error) => {
      // console.log(error);
    });

  }

  async fetchTemplateSubDivisions(relationSubDivisions) {

    let querySubDivisions = relationSubDivisions.query();
    await querySubDivisions.find().then((resultSubDivisions) => {

      // console.log("Division: ");
      // console.log(results[i].toJSON());

      for (let j = 0; j < resultSubDivisions.length; j++) {
        // console.log("subDivisions: ");
        // console.log(resultSubDivisions[j].toJSON());

        this.fetchTemplateLineItems(resultSubDivisions[j].relation('lineItems')).then((lineItems) => {

          resultSubDivisions[j] = {
            'parseObject': resultSubDivisions[j],
            'lineItems' : lineItems,
          };
            // console.log(lineItems);

          // return lineItems;
        });

      }

      // console.log('resultSubDivisions: ' + resultSubDivisions);

    }, (error) => {

    });

  }

  async fetchTemplateLineItems(relationLineItems) {

    let queryLineItems = relationLineItems.query();
    return await queryLineItems.find();

  }

  dismiss() {
    this.ref.close();
  }

}
