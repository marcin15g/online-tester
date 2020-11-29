import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../../../_services/test.service';

@Component({
  selector: 'app-solve-dialog',
  templateUrl: './solve-dialog.component.html',
  styleUrls: ['./solve-dialog.component.css']
})
export class SolveDialogComponent implements OnInit {

  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      testCode: ['', Validators.required]
    })
  }

  onStart() {
    if(this.form.invalid) return true;

    const fData = this.form.value;
    this.testService.checkIfTestExists(fData.testCode)
    .subscribe(
      res => {
        this.router.navigate([`/solve/${fData.testCode}`]);
      },
      err => {
        this.form.reset();
      }
    )
  }

}
