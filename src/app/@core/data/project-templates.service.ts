import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Parse } from 'parse';

@Injectable({
    providedIn: 'root',
})

export class ProjectTemplatesService {

    public projectTemplatesMap: {} = {};
    public projectTemplates: Array<any> = [];
    public observableProjectTemplates: BehaviorSubject<any>;

    constructor() {
        this.observableProjectTemplates = new BehaviorSubject<any[]>(this.projectTemplates);
        this.fetchProjectTemplates();
    }

    async fetchProjectTemplates() {
        const ProjectTemplate = Parse.Object.extend('ProjectTemplate');
        const query = new Parse.Query(ProjectTemplate);
        query.limit(1000);
        this.projectTemplates = await query.find();
        this.generateProjectTemplatesMap(this.projectTemplates);
        this.observableProjectTemplates.next(this.projectTemplates);
    }

    private generateProjectTemplatesMap(projectTemplates) {
        for (let projectTemplate of projectTemplates) {
            this.projectTemplatesMap[projectTemplate['id']] = projectTemplate;
        }
    }

    public async add(projectTemplate) {
        if (this.projectTemplates.filter(value => (value.attributes.name === projectTemplate.name)).length) {
            alert('Project Template with name: ' + projectTemplate.name + ' already exists.');
        } else {
            this.createProjectTemplate(projectTemplate);
        }
    }

    public getProjectTemplates() {
        return this.projectTemplates;
    }

    private async createProjectTemplate(projectTemplateData: any) {
        const ProjectTemplate = Parse.Object.extend('ProjectTemplate');
        const projectTemplate = new ProjectTemplate();
        projectTemplate.set('name', projectTemplateData.name);
        projectTemplate.setACL(new Parse.ACL(Parse.User.current()));
        await projectTemplate.save().then((savedProjectTemplate) => {
          this.projectTemplates.push(savedProjectTemplate);
          this.observableProjectTemplates.next(this.projectTemplates);
        }, (error) => {
          alert('Failed to create new Project Template, with error code: ' + error.message);
        });
    }

    public async deleteProjectTemplate(event: any) {
        let projectTemplate = event.data;
        if (confirm('Are You Sure You Want to Delete Project Template: ' + projectTemplate.attributes.name + ' ?')) {
            await projectTemplate.destroy().then(() => {
                this.projectTemplates = this.projectTemplates.filter( (value) => value.id !== projectTemplate.id );
                this.observableProjectTemplates.next(this.projectTemplates);
            }, (error) => {
                alert('Failed to delete Project Template: ' + projectTemplate.attributes.name +
                ', error message: ' + error.message);
            });
        }
    }

    public update(template) {

    }

}
