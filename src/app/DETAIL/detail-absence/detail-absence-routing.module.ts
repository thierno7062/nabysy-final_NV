import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailAbsencePage } from './detail-absence.page';

const routes: Routes = [
  {
    path: '',
    component: DetailAbsencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailAbsencePageRoutingModule {}
