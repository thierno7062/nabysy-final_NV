import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudAffectationPage } from './crud-affectation.page';

const routes: Routes = [
  {
    path: '',
    component: CrudAffectationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudAffectationPageRoutingModule {}
