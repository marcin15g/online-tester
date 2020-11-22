import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http: HttpClient) { }

  private serverUrl: string = 'https://online-tests2137.herokuapp.com/test/';
  private testObj: object;

  getTest(testID: string) {
    return this.http.get<{test: object}>(this.serverUrl + testID);
  }

  editTest(testID: string, test: object) {
    return this.http.patch<any>(this.serverUrl + testID, test);
  }

  deleteTest(testID: string) {
    return this.http.delete<any>(this.serverUrl + testID);
  }
}
