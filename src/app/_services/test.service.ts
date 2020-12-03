import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class TestService {

  private serverUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  checkIfTestExists(testID: number) {
    return this.http.get<any>(`${this.serverUrl}/check/${testID}`);
  }
}
