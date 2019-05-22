import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService {


  public static compareFunction(direction: any, a: any, b: any) {
    let first = typeof a === 'string' ? a.toLowerCase() : a;
    let second = typeof b === 'string' ? b.toLowerCase() : b;

    if (first < second) {
      return -1 * direction;
    }
    if (first > second) {
      return direction;
    }
    return 0;
  }

  public static filterFunction(a?: any, search?: string): boolean {
    a = typeof a === 'string' ? a.toLowerCase() : a;
    search = typeof search === 'string' ? search.toLowerCase() : search;
    let match = a.indexOf(search) > -1;
    if (match || search === '') {
      return true;
    } else {
      return false;
    }
  }
}
