import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailAffectationPage } from './detail-affectation.page';

const routes: Routes = [
  {
    path: '',
    component: DetailAffectationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailAffectationPageRoutingModule {}
