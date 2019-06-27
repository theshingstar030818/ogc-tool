import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Parse } from 'parse';
import { DivisionsService } from './divisions.service';
import { SubDivisionsService } from './subDivisions.service';
import { LineItemsService } from './line-items.service';


@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  public projects: Array<any> = [];
  public observableProjects: BehaviorSubject<any>;
  public activeProject: any;

  constructor(
    protected divisionsService: DivisionsService,
    protected subDivisionsService: SubDivisionsService,
    protected lineItemsService: LineItemsService,
  ) {
    this.observableProjects = new BehaviorSubject<any[]>(this.projects);
    this.getProjectsParse();
  }

  async getPtoject(projectId) {
    if (this.projects.length !== 0) {
      let project = await this.projects.filter(value => (value.id === projectId))[0];
      return project;
    } else {
      let project = await this.getProjectParse(projectId);
      return project;
    }
  }

  async setActiveProject(projectId) {
    this.activeProject = await this.getPtoject(projectId);
    // console.log(this.activeProject);
  }

  async getProjectParse(projectId) {
    const Project = Parse.Object.extend('Project');
    const query = new Parse.Query(Project);
    query.include('current');
    query.include('current.client');
    return await query.get(projectId);
  }


  async getProjectsParse() {
    const Project = Parse.Object.extend('Project');
    const query = new Parse.Query(Project);
    query.limit(1000);
    query.include('current');
    query.include('current.client');
    this.projects = await query.find();
    this.observableProjects.next(this.projects);
  }

  async addProject(project, data) {
    const ProjectHistory = Parse.Object.extend('ProjectHistory');
    const projectHistoryObject = new ProjectHistory();
    const Client = Parse.Object.extend('Client');
    let ClientObject = new Parse.Query(Client);
    let client = await ClientObject.get(project.client);
    projectHistoryObject.set('name', project.name);
    projectHistoryObject.set('address', project.address);
    projectHistoryObject.set('dueDate', project.duedate);
    projectHistoryObject.set('status', project.status);
    projectHistoryObject.set('client', client);
    projectHistoryObject.set('data', data);
    projectHistoryObject.set('version', 0);
    projectHistoryObject.set('templates', project.template.map((template) => {return template.id}));
    projectHistoryObject.setACL(new Parse.ACL(Parse.User.current()));
    projectHistoryObject.save().then((result) => {
      const Project = Parse.Object.extend('Project');
      const projectObject = new Project();
      projectObject.set('maxVersionCount', 0);
      projectObject.set('current', result);
      projectObject.setACL(new Parse.ACL(Parse.User.current()));
      projectObject.save().then((newProject) => {
        let relationHistory = newProject.relation('history');
        relationHistory.add(result);
        newProject.save().then(() => {
          this.projects.push(newProject);
          this.observableProjects.next(this.projects);
        });
      }, (error) => {
          alert('Failed to create new object, with error code: ' + error.message);
         console.log(error);
      });


    }, (error) => {
      // console.log('Failed to create new object, with error code: ' + error.message);
      // console.log(error);
    });

  }

  removeProject(event) {
    let r = confirm('Are You Sure You Want to Delete This Project?');
    if (r === true) {
      const Project = Parse.Object.extend('Project');
      const ProjectObject = new Project();
      ProjectObject.id = event.data.id;
      ProjectObject.destroy().then((results) => {
        this.projects.splice(event.index, 1);
        this.observableProjects.next(this.projects);
      }, (error) => {
        alert(error);
      });
    }
  }

  getProjects() {
    return this.projects;
  }

  public async generateProjectData(templates) {
    let compressedTemplates: any[] = [];
    for(let template of templates){
      let divisions = await this.divisionsService.getDivisionsByTemplate(template);
      let compressedDivisions = divisions.map(division => {
        let subdivisions: any[] = this.subDivisionsService.getSubDivisions(division.id).map(subDivision => {
          let lineItems: any[] = this.lineItemsService.getLineItems(subDivision.id).map(lineItem => {
            let compressedLineItem = { id: lineItem.id };
            return compressedLineItem;
          });
          return {id: subDivision.id, name: subDivision.attributes.name, lineItems: lineItems };
        });
        return { id: division.id, name: division.attributes.name, subdivisions: subdivisions };
      });
      compressedTemplates.push({
        id: template.id,
        name: template.attributes.name,
        divisions: compressedDivisions,
      });
    }
    
    return {'templates': compressedTemplates};
  }

  shareProject(emails?) {

  }

  async getTemplates() {
    const ProjectTemplate = Parse.Object.extend('ProjectTemplate');
    const queryProjectTemplate = new Parse.Query(ProjectTemplate);
    const resultsProjectTemplate = await queryProjectTemplate.find();
    return resultsProjectTemplate;
  }

  public saveProject(project) {

  }

}
