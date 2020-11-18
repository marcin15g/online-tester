import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { finished } from 'stream';
import { UploadService } from '../_services/upload.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  dynamicForm: FormGroup;
  submitted = false;
  visibleQuestions = 1;
  question = {
    question: ['', Validators.required],
    isMandatory: [false],
    answer1: [''],
    answer2: [''],
    answer3: [''],
    answer4: [''],
    isCorrect1: [''],
    isCorrect2: [''],
    isCorrect3: [''],
    isCorrect4: [''],
  }

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.questions as FormArray; }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      title: ['', Validators.required],
      numberOfQuestions: [''],
      numberOfTestQuestions: [''],
      questions: new FormArray([])
    })

    //Initiate first question
    this.addQuestion();
  }

  addQuestion() {
    this.t.push(this.formBuilder.group(this.question))
    this.f.numberOfQuestions.setValue(this.t.length);
  }

  onChangeQuestions(e) {
    console.log(this.t.controls);
    const numberOfQuestions = e.target.value || 0;
    if(this.t.length < numberOfQuestions) {
      for(let i = this.t.length; i < numberOfQuestions; i++) {
        this.t.push(this.formBuilder.group(this.question))
      }
    } else {
      for (let i = this.t.length; i >= numberOfQuestions; i--) {
        this.t.removeAt(i);
      }      
    }
  }

  onSubmit() {
    this.submitted = true;
    if(this.dynamicForm.invalid) return;

    const test = this.parseForm(this.dynamicForm.value);
    this.uploadService.uploadTest(test)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  onReset() {
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    this.submitted = false;
    this.t.reset();
  }

  parseForm(form) {
    let finishedForm = {
      "title": form.title,
      "user_id": 123,
      "num_of_questions": form.numberOfTestQuestions,
      "questions": []
    };
    form.questions.forEach((q) => {
      let obj = {
        "question": q.question,
        "required": q.isMandatory,
        "answers": [
          {"answer": q.answer1, "correct": q.isCorrect1 ? true : false },
          {"answer": q.answer2, "correct": q.isCorrect2 ? true : false },
          {"answer": q.answer3, "correct": q.isCorrect3 ? true : false },
          {"answer": q.answer4, "correct": q.isCorrect4 ? true : false }
        ]
      }
      finishedForm.questions.push(obj);
    });
    return finishedForm;
  }
}
