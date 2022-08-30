import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudSousDirectionPage } from './crud-sous-direction.page';

const routes: Routes = [
  {
    path: '',
    component: CrudSousDirectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudSousDirectionPageRoutingModule {}
