import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudDirectionPage } from './crud-direction.page';

const routes: Routes = [
  {
    path: '',
    component: CrudDirectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudDirectionPageRoutingModule {}
