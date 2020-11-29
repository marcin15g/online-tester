import { Component, OnInit } from '@angular/core';
import { NgModuleFactory } from '@angular/core/src/r3_symbols';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EditService } from '../../../_services/edit.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  private mode: string = "modify";
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
    public route: ActivatedRoute, 
    public router: Router,
    public editService: EditService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      testID: ['', Validators.required],
      password: ['admin', Validators.required]
    });
  }

  onEdit() {
    if(this.form.invalid) return;
    const testID = this.form.value.testID;
    const pwd = this.form.value.password;

    this.editService.getTest(testID)
    .subscribe(
      res => {
        this.router.navigate(['create/' + testID]);
      },
      err => {
        this._snackBar.open('Test ID is incorrect', 'Dismiss', {
          duration: 5000,
          panelClass: ['red-snackbar']
        });       
      }
    )
  }

  onDelete() {
    if(this.form.invalid) return;
    const testID = this.form.value.testID;
    const pwd = this.form.value.password;

    this.editService.deleteTest(testID)
    .subscribe(
      res => {
        this._snackBar.open('Test succesfully deleted', 'DIsmiss', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.router.navigate(['/']);
      },
      err => {
        console.log(err)
      }
    )
  }

}
