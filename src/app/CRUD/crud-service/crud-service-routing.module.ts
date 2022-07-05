import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudServicePage } from './crud-service.page';

const routes: Routes = [
  {
    path: '',
    component: CrudServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudServicePageRoutingModule {}
