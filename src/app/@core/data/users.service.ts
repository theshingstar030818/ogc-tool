
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';


let counter = 0;

@Injectable()
export class UserService {

  private user = { };

  constructor() {

  }

  getUsers(): Observable<any> {
    return observableOf([this.user]);
  }

  getUserArray(): Observable<any[]> {
    return observableOf([this.user]);
  }

  getUser(): Observable<any> {
    return observableOf(this.user);
  }
}
