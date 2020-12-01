import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SolveService } from '../../_services/solve.service';

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css', './solve-test.component.scss']
})
export class SolveTestComponent implements OnInit {

  test;
  testForm: FormGroup

  constructor(
    private solveService: SolveService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.test = this.solveService.getTest();
    console.log(document.cookie);

    this.testForm = this.formBuilder.group({
      id: [null],
      firstName: [null],
      lastName: [null],
      email: [null],
      questions: new FormArray([])
    });
    this.populateForm(this.test);
  }

  get f() {return this.testForm.controls}
  get q() {return this.f.questions as FormArray}

  populateForm(test) {
    console.log(test);
    console.log(this.f);
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
    console.log(this.testForm.value);
  }

}
