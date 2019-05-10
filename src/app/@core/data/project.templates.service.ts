import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Parse } from 'parse';

@Injectable({
    providedIn: 'root',
})

export class ProjectTemplatesService {
    public projectTemplates: Array<any> = [];
    public observableProjectTemplates: BehaviorSubject<any>;

    constructor() {
        this.observableProjectTemplates = new BehaviorSubject<any[]>(this.projectTemplates);
        this.getDivisions();
    }

    async getDivisions() {
        const ProjectTemplates = Parse.Object.extend('ProjectTemplate');
        const query = new Parse.Query(ProjectTemplates);
        query.limit(1000);
        this.projectTemplates = await query.find();
        return this.projectTemplates;
    }

}
