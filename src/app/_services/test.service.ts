import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private serverUrl: string = 'https://online-tests2137.herokuapp.com/test';

  constructor(private http: HttpClient) { }

  checkIfTestExists(testID: number) {
    return this.http.get<any>(`${this.serverUrl}/check/${testID}`);
  }
}
