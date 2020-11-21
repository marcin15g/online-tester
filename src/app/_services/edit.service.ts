import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http: HttpClient) { }

  serverUrl: string = 'https://online-tests2137.herokuapp.com';

  getTest(testID: string) {
    //TODOTODO
    //TEST RESPONSE
    //return '{"title":"ASDASD","user_id":123,"num_of_questions":"1","questions":[{"question":"Questionssss","required":true,"answers":[{"answer":"ASD","correct":true},{"answer":"DSA","correct":true},{"answer":"SAD","correct":false},{"answer":"DAS","correct":false}]},{"question":"SECONDDD","required":false,"answers":[{"answer":"DASD","correct":false},{"answer":"ASDASD","correct":false},{"answer":"DASDASD","correct":true},{"answer":"ASDASD","correct":true}]}]}'
    return this.http.get<{test: object}>(this.serverUrl + '/test/' + testID);
  }

  editTest(testID: string, test: object) {
    return true;
  }
}
