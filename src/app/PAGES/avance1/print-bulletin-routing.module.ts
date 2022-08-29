import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintBulletinPage } from './print-bulletin.page';

const routes: Routes = [
  {
    path: '',
    component: PrintBulletinPage
  },  {
    path: 'avance',
    loadChildren: () => import('./avance.module').then( m => m.AvancePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintBulletinPageRoutingModule {}
