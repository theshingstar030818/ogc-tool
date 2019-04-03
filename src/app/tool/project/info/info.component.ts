import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectsService } from '../../../@core/data/projects.service';

@Component({
  selector: 'ngx-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  projectInfoForm: FormGroup;
  projectName: FormControl;
  projectAddress: FormControl;
  client: FormControl;
  dueDate: FormControl;
  created: FormControl;
  templates: FormControl;
  template: any;

  constructor(
    private route: ActivatedRoute,
    protected projectsService: ProjectsService,
    // private router: Router,
  ) {
    this.route.parent.params.subscribe( params => {
      // console.log(params);
    });
    // console.log(projectsService.activeProject);
  }

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
    this.templates = new FormControl('', Validators.required);
  }

  createForm() {
    this.projectInfoForm = new FormGroup({
      projectName: this.projectName,
      projectAddress: this.projectAddress,
      client: this.client,
      dueDate: this.dueDate,
      created: this.created,
      templates: this.templates,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.projectsService.getTemplates().then((results) => {
      this.template = results;
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

}
