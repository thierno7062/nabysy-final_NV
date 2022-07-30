import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudPrimePage } from './crud-prime.page';

const routes: Routes = [
  {
    path: '',
    component: CrudPrimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudPrimePageRoutingModule {}
