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

  // private test: object = { "id": 26, "title": "THIS IS A TEST", "numOfQuestions": 3, "numOfTestQuestions": 3, "questions": [ { "id": 28, "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In leo odio, finibus vel suscipit ac, molestie ut metus. Nulla facilisi. Sed bibendum facilisis purus, ut rhoncus tortor lacinia posuere. Vivamus accumsan mollis libero non elementum. Aliquam erat volutpat. Morbi id metus ligula. Aenean ac aliquet lorem, vel interdum ligula. Proin aliquam odio cursus venenatis mollis. Vestibulum a condimentum augue, id dignissim ligula. Suspendisse posuere quis magna ac elementum. Nullam fringilla pulvinar blandit. Etiam turpis risus, gravida in semper quis, interdum in enim. Integer ac felis ut libero ullamcorper ultricies a non nibh.", "required": true, "answers": [ { "id": 101, "answer": "Vivamus malesuada leo ante, ac consequat leo congue non.", "correct": false }, { "id": 102, "answer": "Quisque vel dapibus sapien. Ut a neque mi. Ut sed turpis dui.", "correct": false }, { "id": 103, "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mattis lectus magna, a rutrum quam cursus eget.", "correct": true } ] }, { "id": 29, "question": "Nunc malesuada purus in neque faucibus, ac ullamcorper nisi tincidunt. Suspendisse dapibus, metus vel pellentesque dignissim, neque ligula ullamcorper quam, eu sodales ipsum leo ut felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut lectus justo, faucibus eu est eget, interdum tempor felis. Morbi varius, massa non condimentum vehicula, purus purus scelerisque quam, quis tincidunt felis felis nec leo. Cras dui ante, dictum eu urna nec, commodo pretium mauris. Ut quis turpis id nulla suscipit gravida ut et leo. Fusce libero augue, mattis ut nulla non, laoreet pharetra felis.", "required": true, "answers": [ { "id": 104, "answer": "Phasellus id enim at libero lacinia volutpat sed vitae tellus. Aenean sagittis malesuada dui vitae faucibus.", "correct": true }, { "id": 105, "answer": "Maecenas tincidunt, purus nec vulputate pharetra, dolor enim tempor ante, non suscipit leo purus eget turpis. ", "correct": false } ] }, { "id": 30, "question": "Donec id lectus vitae velit mattis pretium at quis sem. Nam at dictum massa. Ut aliquam pellentesque metus. Phasellus faucibus, leo sed cursus posuere, turpis tortor tincidunt eros, a mollis massa augue id velit. Proin finibus tortor purus, convallis hendrerit nulla ornare vel. Sed consequat nibh eu ultricies iaculis. Aliquam id maximus ante.", "required": false, "answers": [ { "id": 106, "answer": "Maecenas tincidunt, purus nec vulputate pharetra, dolor enim tempor ante, non suscipit leo purus eget turpis.", "correct": true }, { "id": 107, "answer": "Aliquam mattis lectus magna, a rutrum quam cursus eget.", "correct": false }, { "id": 108, "answer": "Curabitur aliquet leo maximus, commodo ipsum eget, placerat magna.", "correct": false }, { "id": 109, "answer": "Praesent non augue in nisi efficitur tincidunt ut eu ipsum.", "correct": true }, { "id": 110, "answer": "Phasellus id enim at libero lacinia volutpat sed vitae tellus.", "correct": false } ] } ], "randomize": true, "password": "asd" }
  private test: object = null;
  private user: object;

  fetchTest(testID: string, personalInfo: object) {
    this.user = personalInfo;
    return this.http.post<any>(this.serverUrl + '/start/' + testID, {result: personalInfo}, {observe: 'response'});
  }

  setTest(test) {
    this.test = test;
  }

  getTest() {
    return this.test;
  }

  
}
