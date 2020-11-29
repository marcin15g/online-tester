import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_components/home/home.component';
import { CreateTestComponent } from './_components/create-test/create-test.component';
import { SolveTestComponent } from './_components/solve-test/solve-test.component';
import { EditDialogComponent } from './_components/edit-test/edit-dialog/edit-dialog.component';
import { SolveDialogComponent } from './_components/solve-test/solve-dialog/solve-dialog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateTestComponent},
  { path: 'create/:testID', component: CreateTestComponent},
  { path: 'solve', component: SolveDialogComponent},
  { path: 'dialog/:type', component: EditDialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
