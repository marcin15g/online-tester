import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { TestCreate } from '../_models/create/test-create.model';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http: HttpClient) { }

  private serverUrl: string = environment.apiUrl;
  private test: TestCreate;
  private password: string;

  fetchTest(testID: string, password: string) {
    return this.http.post<{test: TestCreate}>(`${this.serverUrl}/get/${testID}`, {test: {"password": password}});
  }

  editTest(testID: string, test: TestCreate) {
    return this.http.patch<any>(`${this.serverUrl}/${testID}`, {test: test});
  }

  deleteTest(testID: string, password: string) {
    return this.http.request('delete', `${this.serverUrl}/${testID}`, {body: {test: {password: password}}});
  }

  setPassword(password: string) {this.password = password;}
  getPassword() {return this.password}

  setTest(test: TestCreate) {this.test = test;}
  getTest() {return this.test;}
}
