import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintBulletinPage } from './print-bulletin.page';

const routes: Routes = [
  {
    path: '',
    component: PrintBulletinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintBulletinPageRoutingModule {}
