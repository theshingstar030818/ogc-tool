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
  public activeProject: any = null;

  constructor(
    protected divisionsService: DivisionsService,
    protected subDivisionsService: SubDivisionsService,
    protected lineItemsService: LineItemsService,
  ) {
    this.observableProjects = new BehaviorSubject<any[]>(this.projects);
    this.getProjectsParse();
  }

  async getPtoject(projectId) {
    if(this.projects.length) {
      return this.projects.filter(value => (value.id === projectId));
    } else {
      return await this.getProjectParse(projectId);
    }
  }

  async getProjectParse(projectId: string) {
    const Project = Parse.Object.extend('Project');
    const query = new Parse.Query(Project);
    query.equalTo("id", projectId);
    query.include('current');
    query.include('current.client');
    return await query.find();
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
    projectHistoryObject.setACL(new Parse.ACL(Parse.User.current()));
    projectHistoryObject.save().then((result) => {
      let relation = result.relation('templates');
      for (let template of project.template) {
        relation.add(template);
      }
      result.save().then(() => {
        const Project = Parse.Object.extend('Project');
        const projectObject = new Project();
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
          //  console.log(error);
        });
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
    let divisions: any[] = await this.divisionsService.getDivisionsByTemplates(templates);
    let compressedDivisions = divisions.map(division => {
      let subdivisions: any[] = this.subDivisionsService.getSubDivisions(division.id).map(subDivision => {
        let lineItems: any[] = this.lineItemsService.getLineItems(subDivision.id).map(lineItem => {
          let compressedLineItem = { id: lineItem.id, ...lineItem.attributes };
          delete compressedLineItem.subDivision;
          delete compressedLineItem.ACL;
          return compressedLineItem;
        });
        return {id: subDivision.id, name: subDivision.attributes.name, lineItems: lineItems };
      });
      return { id: division.id, name: division.attributes.name, subdivisions: subdivisions };
    });
    return {'divisions': compressedDivisions};
  }

  shareProject(emails?) {

  }

  async getTemplates() {
    const ProjectTemplate = Parse.Object.extend('ProjectTemplate');
    const queryProjectTemplate = new Parse.Query(ProjectTemplate);
    const resultsProjectTemplate = await queryProjectTemplate.find();
    return resultsProjectTemplate;
  }

}
