import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolveService {

  constructor(private http: HttpClient) { }

  serverUrl: string = environment.apiUrl;


  fetchTest(testID: string, personalInfo: object) {
    return this.http.post<any>(this.serverUrl + '/start/' + testID, {result: personalInfo}, {observe: 'response', withCredentials: true});
  }

  uploadTest(testID, resultUUID, test) {
    return this.http.post<any>(`${this.serverUrl}/save/${testID}/${resultUUID}`, {test: test});  
  }
  
}
