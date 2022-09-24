import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudCreditPage } from './crud-credit.page';

const routes: Routes = [
  {
    path: '',
    component: CrudCreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudCreditPageRoutingModule {}
