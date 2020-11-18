import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http: HttpClient) { }

  serverUrl: string = 'TODOTODO';

  getTest(testID: string) {
    //TODOTODO
    return '{"title":"ASDASD","user_id":123,"num_of_questions":"1","questions":[{"question":"Questionssss","required":true,"answers":[{"answer":"ASD","correct":true},{"answer":"DSA","correct":true},{"answer":"SAD","correct":false},{"answer":"DAS","correct":false}]},{"question":"SECONDDD","required":false,"answers":[{"answer":"DASD","correct":false},{"answer":"ASDASD","correct":false},{"answer":"DASDASD","correct":true},{"answer":"ASDASD","correct":true}]}]}'
  }
}
