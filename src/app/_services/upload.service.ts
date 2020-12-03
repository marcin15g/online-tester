import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  serverUrl: string = environment.apiUrl

  uploadTest(test) {
    return this.http.post<any>(this.serverUrl, {test: test});
  }
}
