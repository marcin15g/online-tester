import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UploadService } from '../../../_services/upload.service';

export interface DialogData {
    testID: string
    mode: string
    test: object
  }

@Component({
    selector: 'app-popup',
    templateUrl: 'popup.html',
    styleUrls: ['popup.css']
  })
  export class Popup {

    form: FormGroup;
    testID: string;


    constructor(
      public dialogRef: MatDialogRef<Popup>,
      private formBuilder: FormBuilder,
      private uploadService: UploadService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit() {
      this.form = this.formBuilder.group({
        password: ['', Validators.required]
      })
    }

    onClose() { this.dialogRef.close(); }

    onSubmit() {
      if(this.form.invalid) return;
      const test = this.data.test;
      test['password'] = this.form.value.password;

      console.log(test);
      this.uploadService.uploadTest(test)
      .subscribe(
        res => { 
          this.testID = res.testCode;
        },
        err => {
          console.log(err);
        }
      )
    }
  }