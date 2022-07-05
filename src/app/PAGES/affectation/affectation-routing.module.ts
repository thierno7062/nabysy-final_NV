import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AffectationPage } from './affectation.page';

const routes: Routes = [
  {
    path: '',
    component: AffectationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AffectationPageRoutingModule {}
