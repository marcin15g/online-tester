import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { EditService } from '../_services/edit.service';
import { UploadService } from '../_services/upload.service';
import { ThrowStmt } from '@angular/compiler';

export interface DialogData {
  testID: string
  idLoading: boolean
  mode: string
}

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  private mode: string = 'create';
  dynamicForm: FormGroup;
  submitted = false;
  visibleQuestions = 1;
  testObj: object;
  testID: string;
  idLoading: boolean = true;
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

  constructor(
    private formBuilder: FormBuilder, 
    private uploadService: UploadService,
    public route: ActivatedRoute,
    public router: Router,
    public editService: EditService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    //Declare reactive form
    this.dynamicForm = this.formBuilder.group({
      title: ['', Validators.required],
      numberOfQuestions: [''],
      numberOfTestQuestions: [''],
      questions: new FormArray([])
    })

    //Set create/modify mode
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('testID')) {
          this.mode = 'modify';
          this.testID = paramMap.get("testID");

          this.editService.getTest(paramMap.get("testID")).subscribe(
            res => {
              console.log(res);
              this.testObj = res.test;
              this.populateForm(this.testObj);
            },
            err => {console.log(err)}
          );
        } else {
          this.mode = 'create';
          this.addQuestion();
        }
        console.log(this.mode);
    })
  }

  
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.questions as FormArray; }

  addQuestion() {
    this.t.push(this.formBuilder.group(this.question))
    this.f.numberOfQuestions.setValue(this.t.length);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(
      Popup,
      {
        width: '500px',
        data: {testID: this.testID, idLoading: this.idLoading, mode: this.mode}
      }
    )

    dialogRef.afterClosed().subscribe(res => {
      this.router.navigate(['/']);
    })
  }

  onChangeQuestions(e) {
    const numberOfQuestions = e || 0;
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

  populateForm(test) {
    console.log(test);
    this.f.title.setValue(test.title);   
    this.f.numberOfTestQuestions.setValue(test.numOfQuestions);
    this.f.numberOfQuestions.setValue(test.questions.length);
    for(let i = 0; i < test.questions.length; i++) {
      let q = test.questions[i];
      this.t.push(this.formBuilder.group({
        question: [q.question, Validators.required],
        isMandatory: [q.required],
        answer1: [q.answers[0].answer],
        answer2: [q.answers[1].answer],
        answer3: [q.answers[2].answer],
        answer4: [q.answers[3].answer],
        isCorrect1: [q.answers[0].correct],
        isCorrect2: [q.answers[1].correct],
        isCorrect3: [q.answers[2].correct],
        isCorrect4: [q.answers[3].correct],       
      }))
    }
  } 
}

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.html',
  styleUrls: ['popup.css']
})
export class Popup {
  constructor(
    public dialogRef: MatDialogRef<Popup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  checkData() {
    console.log(this.data)
  }
  onClick() {
    console.log('CLICK');
    this.dialogRef.close();
  }

}
