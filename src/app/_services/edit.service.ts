import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http: HttpClient) { }

  private serverUrl: string = environment.apiUrl;
  private testObj: object;
  private password: string;

  getTest(testID: string, password: string) {
    return this.http.post<{test: object}>(`${this.serverUrl}/get`, {test: {"testCode": testID, "password": password}});
  }

  editTest(testID: string, test: object) {
    return this.http.patch<any>(`${this.serverUrl}/${testID}`, {test: test});
  }

  deleteTest(testID: string) {
    return this.http.delete<any>(`${this.serverUrl}/${testID}`);
  }

  setPassword(password: string) {this.password = password;}
  getPassword() {return this.password}
}
