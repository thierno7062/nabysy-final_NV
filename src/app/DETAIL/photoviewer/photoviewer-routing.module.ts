import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoviewerPage } from './photoviewer.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoviewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoviewerPageRoutingModule {}
