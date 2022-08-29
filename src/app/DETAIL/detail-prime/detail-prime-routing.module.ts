import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPrimePage } from './detail-prime.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPrimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPrimePageRoutingModule {}
