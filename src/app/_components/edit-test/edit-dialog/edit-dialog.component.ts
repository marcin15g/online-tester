import { Component, OnInit } from '@angular/core';
import { NgModuleFactory } from '@angular/core/src/r3_symbols';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EditService } from '../../../_services/edit.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TestService } from '../../../_services/test.service';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  private mode: string = "modify";
  isLoading: boolean = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
    public route: ActivatedRoute, 
    public router: Router,
    public editService: EditService,
    public testService: TestService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      testID: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onEdit() {
    if(this.form.invalid) return;
    const testID = this.form.value.testID;
    const pwd = this.form.value.password;
    this.isLoading = true;

    this.editService.fetchTest(testID, pwd)
    .subscribe(
      res => {     
        this.isLoading = false;  
        this.editService.setPassword(pwd);
        this.editService.setTest(res.test);
        this.router.navigate(['create/' + testID]);
      },
      err => {
        this.isLoading = false;
        this.form.reset();
        this._snackBar.open('Incorrect Code or Password', 'Dismiss', {
          duration: 5000,
          panelClass: ['red-snackbar']
        });       
      }
    )
  }

}
