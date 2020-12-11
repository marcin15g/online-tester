import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TestCreate } from '../../../_models/create/test-create.model';
import { EditService } from '../../../_services/edit.service';
import { UploadService } from '../../../_services/upload.service';

export interface DialogData {
    testID: string
    mode: string
    test: TestCreate
  }

@Component({
    selector: 'app-popup',
    templateUrl: 'popup.html',
    styleUrls: ['popup.css']
  })
  export class Popup {

    form: FormGroup;
    testID: string;
    private isSubmitted: boolean = false;
    private isLoading: boolean = false;


    constructor(
      public dialogRef: MatDialogRef<Popup>,
      private formBuilder: FormBuilder,
      private uploadService: UploadService,
      private editService: EditService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit() {
      this.form = this.formBuilder.group({
        password: ['', Validators.required]
      })
    }

    onClose() { this.dialogRef.close(); }

    onSubmit() {
      if(this.form.invalid || this.isSubmitted) return;
      
      this.isSubmitted = true;
      this.isLoading = true;
      const test = this.data.test;
      test['password'] = this.form.value.password;

      if(this.data.mode === 'create') {
        this.uploadService.uploadTest(test)
        .subscribe(
          res => { 
            this.isLoading = false;
            this.testID = res.testCode;
          },
          err => {
            console.log(err);
          }
        )
      } else if(this.data.mode === 'modify') {
        this.editService.editTest(this.data.testID, test)
        .subscribe(
          res => { 
            this.isLoading = false;
            this.testID = this.data.testID;
          },
          err => {
            console.log(err);
          }
        )
      }
    }
  }