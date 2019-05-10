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

    public add(division?) {
        // console.log(division);
    }

    public getDivisions() {
        return this.divisions;
    }

}
