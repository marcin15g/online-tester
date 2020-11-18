import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { SolveTestComponent } from './solve-test/solve-test.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateTestComponent},
  { path: 'create/:testID', component: CreateTestComponent},
  { path: 'solve', component: SolveTestComponent},
  { path: 'dialog/:type', component: DialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
