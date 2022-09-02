import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailSalairePage } from './detail-salaire.page';

const routes: Routes = [
  {
    path: '',
    component: DetailSalairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailSalairePageRoutingModule {}
