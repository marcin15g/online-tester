import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  serverUrl: string = 'TODOTODO';

  uploadTest(test) {
    return this.http.post<{res: string}>(this.serverUrl + '/upload', {test: test});
  }
}
