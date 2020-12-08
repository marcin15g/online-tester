import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SolveService } from '../../_services/solve.service';
import { ResultComponent } from './result/result.component';



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
  isSubmitted: boolean = false;

  startTime: number;
  duration: number;

  constructor(
    private solveService: SolveService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
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
          const storedTest = JSON.parse(localStorage.getItem(this.resultUUID));
          this.test = storedTest.test;
          this.startTime = new Date(storedTest.createdAt).getTime();
          this.duration = storedTest.test.testTime;

          this.testForm = this.formBuilder.group({
            id: [null],
            questions: new FormArray([])
          });
          this.populateForm(this.test);   
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
    this.solveService.uploadTest(this.testID, this.resultUUID,this.testForm.value)
    .subscribe(
      res => {
        this.cookieService.delete("resultUUID");
        localStorage.removeItem(this.resultUUID);
        this.isSubmitted = true;
        this.openResult(res.percentResult);
      },
      err => {console.log(err);}
    )
  }

  openResult(result: number) {
    const dialogRef = this.dialog.open(ResultComponent,
      {
        width: '500px',
        data: {result: result}
      });
    dialogRef.afterClosed().subscribe(res => {
      this.router.navigate(["/"]);
    })
  }

  timeEnded() {
    this.onSubmit();
  }

}
