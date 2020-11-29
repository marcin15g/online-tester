import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

  checkIfTestExists(testID: number) {
    //TODO
    return true;
  }
}
