import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SolveService } from '../../_services/solve.service';

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css', './solve-test.component.scss']
})
export class SolveTestComponent implements OnInit {

  test: object;
  testForm: FormGroup;
  resultUUID: string;
  testID: string;

  constructor(
    private solveService: SolveService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('testID')) {
        //Get testID from url params
        this.testID = paramMap.get("testID");

        //Search for active session
        this.resultUUID = this.cookieService.get("resultUUID");
        if(!this.resultUUID) {
          this.router.navigate(['/']);
        }
        else {
          //Fetch test from local storage and populate the form
          this.test = JSON.parse(localStorage.getItem(this.resultUUID));
          this.testForm = this.formBuilder.group({
            id: [null],
            questions: new FormArray([])
          });
          this.populateForm(this.test);   
          console.log(this.test);  
        }
      }
    })
  }

  get f() {return this.testForm.controls}
  get q() {return this.f.questions as FormArray}

  populateForm(test) {
    this.f.id.setValue(test.id);
    
    for(let i = 0; i < test.questions.length; i++ ) {
      let question = test.questions[i];
      let answers = [];

      question.answers.forEach(answer => {
        answers.push(this.formBuilder.group({
          id: [answer.id],
          answer: [answer.answer],
          checked: [false]
        }))
      });

      this.q.push(this.formBuilder.group({
        id: [question.id],
        question: [question.question],
        answers: new FormArray(answers)
      }))
    }
  }

  onSubmit() {
    if(this.testForm.invalid) return;
    console.log(this.testForm.value)
    this.solveService.uploadTest(this.testID, this.resultUUID,this.testForm.value)
    .subscribe(
      res => {
        this.cookieService.delete("resultUUID");
        localStorage.removeItem(this.resultUUID);
        console.log('RES:::: ', res);
      },
      err => {console.log(err);}
    )
  }

}
