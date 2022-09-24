import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCreditPage } from './detail-credit.page';

const routes: Routes = [
  {
    path: '',
    component: DetailCreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCreditPageRoutingModule {}
