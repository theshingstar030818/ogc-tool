import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  public projects: Array<any> = [];
  public observableProjects: BehaviorSubject<any>;

  public mockProject = {
    id: '100',
    projectName: '201 Evergreen Strrt ReRe',
    projectAddress: '201 Evergreen StVestal, NY 13850, USA',
    client: 'John Adams',
    budget: '$0.00',
    cost: '$0.00',
    status: 'In-Progress',
    dueDate: '21 Days (2018/09/21)',
    created: '2017/06/21',
  };

  constructor() {
    this.observableProjects = new BehaviorSubject<any[]>(this.projects);
    this.getProjectsParse();
  }

  async getProjectsParse() {

    const Project = Parse.Object.extend('Project');
    const query = new Parse.Query(Project);
    query.include('current');
    query.include('current.client');
    const results = await query.find();

    this.projects = results;
    this.observableProjects.next(this.projects);
  }

  //  TODO
  addProject(project?) {
    this.projects.push(this.mockProject);
    this.observableProjects.next(this.projects);
  }

  // TODO
  removeProject(event) {
    let r = confirm('Are You Sure You Want to Delete This Project?');
    if (r === true) {
      const Project = Parse.Object.extend('Project');
      const ProjectObject = new Project();
      ProjectObject.id = event.data.id;
      ProjectObject.destroy().then((results) => {
        // The object was deleted from the Parse Cloud.
        this.projects.splice(event.index, 1);
        this.observableProjects.next(this.projects);

      }, (error) => {
        // console.log(error);
      });
    }
  }

  getProjects() {
    return this.projects;
  }

  async getTemplates() {
    const ProjectTemplate = Parse.Object.extend('ProjectTemplate');
    const queryProjectTemplate = new Parse.Query(ProjectTemplate);
    const resultsProjectTemplate = await queryProjectTemplate.find();
    let templates: Array<any> = resultsProjectTemplate;
    return templates;
  }
}
