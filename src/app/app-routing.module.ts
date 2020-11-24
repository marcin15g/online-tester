import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_components/home/home.component';
import { CreateTestComponent } from './_components/create-test/create-test.component';
import { SolveTestComponent } from './_components/solve-test/solve-test.component';
import { DialogComponent } from './_components/dialog/dialog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
