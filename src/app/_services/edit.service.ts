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

  getTest(testID: string) {
    return this.http.get<{test: object}>(`${this.serverUrl}/${testID}`);
  }

  editTest(testID: string, test: object) {
    return this.http.patch<any>(`${this.serverUrl}/${testID}`, {test: test});
  }

  deleteTest(testID: string) {
    return this.http.delete<any>(`${this.serverUrl}/${testID}`);
  }
}
