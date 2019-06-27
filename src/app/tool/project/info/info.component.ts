import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProjectsService } from '../../../@core/data/projects.service';
import { ProjectTemplatesService } from '../../../@core/data/project-templates.service';

@Component({
  selector: 'ngx-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  projectInfoForm: FormGroup;
  projectName: FormControl = new FormControl();
  projectAddress: FormControl = new FormControl();
  client: FormControl = new FormControl();
  dueDate: FormControl = new FormControl();
  created: FormControl = new FormControl();
  templates;
  template: any;

  constructor(
    private route: ActivatedRoute,
    protected projectsService: ProjectsService,
    public projectTemplatesService: ProjectTemplatesService,
    private formBuilder: FormBuilder,
  ) {}

  createFormControls() {
    this.projectName = new FormControl(
      this.projectsService.activeProject.get('current').get('name'), Validators.required);
    this.projectAddress = new FormControl(
      this.projectsService.activeProject.get('current').get('address'), Validators.required);
    this.client = new FormControl(
      this.projectsService.activeProject.get('current').get('client').get('firstName') +
      this.projectsService.activeProject.get('current').get('client').get('lastName'), Validators.required);
    this.dueDate = new FormControl(
      this.projectsService.activeProject.get('current').get('dueDate'), Validators.required);
    this.created = new FormControl(
      this.projectsService.activeProject.createdAt, Validators.required);
    this.templates =
      this.projectsService.activeProject.get('current').get('templates');
  }

  createForm() {
    this.projectInfoForm = new FormGroup({
      projectName: this.projectName,
      projectAddress: this.projectAddress,
      client: this.client,
      dueDate: this.dueDate,
      created: this.created,
      templates: this.formBuilder.array(this.templates),
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

    this.projectsService.getTemplates().then((results) => {
      this.template = results;
      // console.log(this.template);
    }, (error) => {
      // console.log(error);
    });
  }

  onSubmit() {
    if (this.projectInfoForm.valid) {
      this.projectInfoForm.reset();

    } else {
      window.alert('Form fields are not valid');
    }
  }

  doNothing() {

  }

  saveProject() {
    // this.projectsService.activeProject.save();
    // console.log(this.projectsService.activeProject);
  }

}
