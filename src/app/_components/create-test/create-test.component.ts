import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { EditService } from '../../_services/edit.service';
import { UploadService } from '../../_services/upload.service';
import { Popup } from './popup/popup';
import { MatSnackBar } from '@angular/material/snack-bar';
import { questionsToTestQuestions } from '../../_helpers/validators/questionsToTestQuestions';
import { requiredToTestQuestions } from '../../_helpers/validators/requiredToTestQuestions';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  mode: string = 'create';
  dynamicForm: FormGroup;
  visibleQuestions: number = 1;
  testObj;
  formTest;
  testID: string;

  constructor(
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar,
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
      numOfQuestions: [1, [Validators.required, Validators.min(1)]],
      numOfTestQuestions: [1, [Validators.required, Validators.min(1)]],
      testTime: [15, [Validators.required, Validators.min(1)]],
      questions: new FormArray([]),
      randomize: [true]
    }, {validators: [questionsToTestQuestions, requiredToTestQuestions]})

    //Set create/modify mode
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('testID')) {
          this.mode = 'modify';
          this.testID = paramMap.get("testID");

          this.testObj = this.editService.getTest();
          if(this.testObj) {
            this.populateForm(this.testObj);
          } else {
            this.router.navigate(['/']);
          }
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
    this.f.numOfQuestions.setValue(this.t.length);
  }

  removeQuestion(index): void {
    this.t.removeAt(index);
    this.f.numOfQuestions.setValue(this.t.length);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Popup,
      {
        width: '500px',
        data: {testID: this.testID, mode: this.mode, test: this.formTest }
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
    this.formTest = this.dynamicForm.value;
    this.openDialog();
  }

  onReset() {
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    this.t.reset();
  }

  onDelete() {
    const pwd = this.editService.getPassword();
    if(pwd) {this.editService.deleteTest(this.testID, pwd)
      .subscribe(
        res => {
          this.snackBar.open('Test succesfully deleted!', 'Dismiss', {
            duration: 5000
          });
          this.router.navigate(['/']);
        },
        err => {console.log(err);}
      )
    }
  }

  populateForm(test) {

    this.f.id.setValue(test.id);
    this.f.title.setValue(test.title);   
    this.f.numOfTestQuestions.setValue(test.numOfTestQuestions);
    this.f.numOfQuestions.setValue(test.questions.length);
    this.f.testTime.setValue(test.testTime);
    this.f.randomize.setValue(test.randomize);

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

