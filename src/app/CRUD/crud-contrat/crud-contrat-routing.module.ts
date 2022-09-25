import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudContratPage } from './crud-contrat.page';

const routes: Routes = [
  {
    path: '',
    component: CrudContratPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudContratPageRoutingModule {}
