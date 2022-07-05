import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudEmployePage } from './crud-employe.page';

const routes: Routes = [
  {
    path: '',
    component: CrudEmployePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudEmployePageRoutingModule {}
