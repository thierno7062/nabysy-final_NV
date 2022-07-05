import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudAbsencePage } from './crud-absence.page';

const routes: Routes = [
  {
    path: '',
    component: CrudAbsencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudAbsencePageRoutingModule {}
