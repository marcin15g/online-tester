import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';
import { LoginInfo } from '../_models/solve/login-info.model';
import { TestSolve } from '../_models/solve/test-solve.model';

@Injectable({
  providedIn: 'root'
})
export class SolveService {

  constructor(private http: HttpClient) { }

  serverUrl: string = environment.apiUrl;

  fetchTest(testID: string, personalInfo: LoginInfo) {
    return this.http.post<any>(this.serverUrl + '/start/' + testID, {result: personalInfo}, {observe: 'response', withCredentials: true});
  }

  uploadTest(testID: string, resultUUID: string, test: TestSolve) {
    return this.http.post<any>(`${this.serverUrl}/save/${testID}/${resultUUID}`, {test: test});  
  }
  
}
