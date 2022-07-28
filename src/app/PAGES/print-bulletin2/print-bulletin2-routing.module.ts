import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintBulletin2Page } from './print-bulletin2.page';

const routes: Routes = [
  {
    path: '',
    component: PrintBulletin2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintBulletin2PageRoutingModule {}
