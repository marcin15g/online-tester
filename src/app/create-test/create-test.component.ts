import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

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
    console.log('Submitted!', this.dynamicForm.value);
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

}
