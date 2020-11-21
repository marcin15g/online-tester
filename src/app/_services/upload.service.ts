import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  serverUrl: string = 'https://online-tests2137.herokuapp.com';

  uploadTest(test) {
    return this.http.post<any>(this.serverUrl + '/test', {test: test});
  }
}
