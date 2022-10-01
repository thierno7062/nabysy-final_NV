import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesUsersPage } from './acces-users.page';

const routes: Routes = [
  {
    path: '',
    component: AccesUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesUsersPageRoutingModule {}
