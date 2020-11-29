import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: FormGroup;
  @Input() index: number;

  @Output() removeEvent = new EventEmitter<number>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  get answers() { return this.question.controls.answers as FormArray; }

  ngOnInit(): void {
    //Generate 3 empty answers for new question
    if(this.answers.length === 0) {
      this.addAnswer();
      this.addAnswer();
      this.addAnswer();
    }
  }

  addAnswer(): void {
    debugger;
    this.answers.push(this.formBuilder.group({
      id: [null],
      answer: [""],
      correct: [false]
    }));
  }

  removeAnswer(index: number): void {
    this.answers.removeAt(index);
  }

  removeQuestion(index: number): void {
    this.removeEvent.emit(index);
  }

}
