import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SolveService } from '../../../_services/solve.service';
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
    private solveService: SolveService,
    private cookieService: CookieService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      testCode: ['', Validators.required]
    })
  }

  onStart() {
    if(this.form.invalid) return true;

    const fData = this.form.value;
    const personalInfo = {
      "firstName": fData.firstName,
      "lastName": fData.lastName,
      "email": fData.email
    }
    console.log(personalInfo);

    this.solveService.fetchTest(fData.testCode, personalInfo)
    .subscribe(
      res => {
        this.cookieService.set("resultUUID", res.body.resultUUID, {expires: new Date(res.body.finishedAt)});
        localStorage.setItem(res.body.resultUUID, JSON.stringify(res.body));

        this.router.navigate([`/solve/${fData.testCode}`]);
      },
      err => {
        console.log(err);
      }
    )   
  }
}
