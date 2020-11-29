import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

//Angular Material 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { HeaderComponent } from './_components/header/header.component';
import { CreateTestComponent } from './_components/create-test/create-test.component';
import { SolveTestComponent } from './_components/solve-test/solve-test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EditDialogComponent } from './_components/edit-test/edit-dialog/edit-dialog.component';
import { Popup } from './_components/create-test/popup/popup';
import { QuestionComponent } from './_components/create-test/question/question.component';

const materialImports = [
    MatToolbarModule,
    MatRippleModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CreateTestComponent,
    SolveTestComponent,
    EditDialogComponent,
    Popup,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    materialImports,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
