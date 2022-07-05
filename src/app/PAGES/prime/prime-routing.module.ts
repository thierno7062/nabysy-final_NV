import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimePage } from './prime.page';

const routes: Routes = [
  {
    path: '',
    component: PrimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimePageRoutingModule {}
