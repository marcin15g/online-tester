import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.css']
})
export class TestQuestionComponent implements OnInit {

  @Input() question: FormGroup;
  @Input() index: number;

  constructor(private formBuilder: FormBuilder) { }

  get q() {return this.question.controls }
  get answers() { return this.q.answers as FormArray }

  ngOnInit(): void {
  }

}
