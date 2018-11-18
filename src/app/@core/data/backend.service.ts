import { Injectable } from '@angular/core';

// Parse
import { Parse } from 'parse';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  public initialize () {
    Parse.initialize(environment.backend.appId);
    Parse.serverURL = environment.backend.serverURL;
  }
}
