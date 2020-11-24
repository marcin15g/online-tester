import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    testID: string
    mode: string
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

    onClick() { this.dialogRef.close(); }
  }