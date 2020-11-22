import { Component, OnInit } from '@angular/core';
import { NgModuleFactory } from '@angular/core/src/r3_symbols';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EditService } from '../_services/edit.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  private mode: string = "modify";
  buttonTxt: string = "";
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
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.mode = paramMap.get('type');
      if(this.mode === 'modify') {
        this.buttonTxt = "EDIT";
      }
    })
  }

  onEdit() {
    if(this.form.invalid) return;
    const testID = this.form.value.testID;
    const pwd = this.form.value.password;

    //TODO FETCH TEST
    this.router.navigate(['create/' + testID]);
    console.log(this.form.value);
  }

  onDelete() {
    if(this.form.invalid) return;
    const testID = this.form.value.testID;
    const pwd = this.form.value.password;

    this.editService.deleteTest(testID)
    .subscribe(
      res => {
        console.log('DELETED');
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
