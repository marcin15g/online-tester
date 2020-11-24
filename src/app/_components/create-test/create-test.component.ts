import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { EditService } from '../../_services/edit.service';
import { UploadService } from '../../_services/upload.service';
import { Popup } from './popup/popup';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  private mode: string = 'create';
  dynamicForm: FormGroup;
  visibleQuestions: number = 1;
  testObj;
  testID: string;

  constructor(
    private formBuilder: FormBuilder, 
    public uploadService: UploadService,
    public editService: EditService,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    //Declare reactive form
    this.dynamicForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      userID: [123],
      numberOfQuestions: [null],
      numberOfTestQuestions: [null],
      questions: new FormArray([])
    })

    //Set create/modify mode
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('testID')) {
          this.mode = 'modify';
          this.testID = paramMap.get("testID");
          this.editService.getTest(this.testID)
          .subscribe(
            res => {
              this.testObj = res.test;
              this.populateForm(this.testObj);
            },
            err => {console.log(err)}
          );
        } else {
          this.mode = 'create';
          this.addQuestion();
        }
    })
  }

  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.questions as FormArray; }

  addQuestion(): void {
    this.t.push(this.formBuilder.group({
      id: [null],
      question: ['', Validators.required],
      required: [false],
      answers: new FormArray([])
    }));
    this.f.numberOfQuestions.setValue(this.t.length);
  }

  removeQuestion(index): void {
    this.t.removeAt(index);
    this.f.numberOfQuestions.setValue(this.t.length);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Popup,
      {
        width: '500px',
        data: {testID: this.testID, mode: this.mode}
      });
    dialogRef.afterClosed().subscribe(res => {
      this.router.navigate(['/']);
    })
  }

  onChangeQuestions(inputNuner): void {
    const numberOfQuestions = inputNuner || 0;
    if(this.t.length < numberOfQuestions) {
      for(let i = this.t.length; i < numberOfQuestions; i++) {
        this.t.push(this.formBuilder.group({
          id: [null],
          question: ['', Validators.required],
          required: [false],
          answers: new FormArray([])
        }))
      }
    } else {
      for (let i = this.t.length; i >= numberOfQuestions; i--) {
        this.t.removeAt(i);
      }      
    }
  }

  onSubmit() {
    if(this.dynamicForm.invalid) return;
    console.log(this.dynamicForm.value);
    // const test = this.parseForm(this.dynamicForm.value);
    const test = this.dynamicForm.value;

    if(this.mode === 'create') {
      this.uploadService.uploadTest(test)
      .subscribe(
        res => { 
          this.testID = res.testCode;
          this.openDialog();
        },
        err => {
          console.log(err);
        }
      )
    }
    else if(this.mode === 'modify') {
      this.editService.editTest(this.testID, test)
      .subscribe(
        res => {
          console.log(res);
          this.openDialog();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  onReset() {
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    this.t.reset();
  }


  // parseForm(form) {
  //   let finishedForm = {
  //     "testCode": this.testID ? this.testID : null,
  //     "id": form.id ? form.id : null,
  //     "title": form.title,
  //     "userId": 123,
  //     "numOfQuestions": parseInt(form.numberOfTestQuestions),
  //     "questions": []
  //   };
  //   form.questions.forEach((q) => {
  //     let obj = {
  //       "id": q.id ? q.id : null,
  //       "question": q.question,
  //       "required": q.required,
  //       "answers": [
  //         {"id": q.id1 ? q.id1 : null, "answer": q.answer1, "correct": q.isCorrect1 ? true : false },
  //         {"id": q.id2 ? q.id2 : null, "answer": q.answer2, "correct": q.isCorrect2 ? true : false },
  //         {"id": q.id3 ? q.id3 : null, "answer": q.answer3, "correct": q.isCorrect3 ? true : false },
  //         {"id": q.id4 ? q.id4 : null, "answer": q.answer4, "correct": q.isCorrect4 ? true : false }
  //       ]
  //     }
  //     finishedForm.questions.push(obj);
  //   });    
  //   return finishedForm;
  // }

  populateForm(test) {
    console.log(test);

    this.f.id.setValue(test.id);
    this.f.title.setValue(test.title);   
    this.f.numberOfTestQuestions.setValue(test.numOfQuestions);
    this.f.numberOfQuestions.setValue(test.questions.length);

    for(let i = 0; i < test.questions.length; i++) {
      let q = test.questions[i];

      let answers = [];
      q.answers.forEach(a => {
        answers.push(this.formBuilder.group({
          id: [a.id],
          answer: [a.answer],
          correct: [a.correct]          
        }))
      });

      this.t.push(this.formBuilder.group({
        id: [q.id],
        question: [q.question, Validators.required],
        required: [q.required],
        answers: new FormArray(answers)
      }))
    }
  } 

}

