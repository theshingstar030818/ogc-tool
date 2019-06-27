import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Parse } from 'parse';

@Injectable({
    providedIn: 'root',
})

export class DivisionsService {

    public divisions: Array<any> = [];
    public observableDivisions: BehaviorSubject<any>;

    constructor() {
        this.observableDivisions = new BehaviorSubject<any[]>(this.divisions);
        this.fetchDivisions();
    }

    async fetchDivisions() {
        const Division = Parse.Object.extend('Division');
        const query = new Parse.Query(Division);
        query.limit(1000);
        this.divisions = await query.find();
        this.observableDivisions.next(this.divisions);
    }

    public async add(division) {
        if (this.divisions.filter(dev => (dev.attributes.name === division.name)).length) {
            alert('Division with name: ' + division.name + ' already exists.');
        } else {
            this.createDivision(division.name);
        }
    }

    public async update(division) {

    }

    public getAllDivisions() {
        return this.divisions;
    }

    public async getDivisionsByTemplate(template: any) {
        let relationdivisions = template.relation('divisions');
        let querydivisions = relationdivisions.query();
        return await querydivisions.find();
    }

    private async createDivision(name: String) {
        const Division = Parse.Object.extend('Division');
        const division = new Division();
        division.set('name', name);
        division.setACL(new Parse.ACL(Parse.User.current()));
        await division.save().then((savedDivision) => {
          this.divisions.push(savedDivision);
          this.observableDivisions.next(this.divisions);
        }, (error) => {
          alert('Failed to create new Division, with error code: ' + error.message);
        });
    }

    public async deleteDivision(event: any) {
        let division = event.data;
        if (confirm('Are You Sure You Want to Delete Division: ' + division.attributes.name + ' ?')) {
            await division.destroy().then(() => {
                this.divisions = this.divisions.filter( (value) => value.id !== division.id );
                this.observableDivisions.next(this.divisions);
                event.confirm.resolve();
            }, (error) => {
                alert('Failed to delete Division: ' + division.attributes.name +
                ', error message: ' + error.message);
                event.confirm.reject();
            });
        } else {
            event.confirm.reject();
        }
    }

}
