import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudContratPageRoutingModule } from './crud-contrat-routing.module';

import { CrudContratPage } from './crud-contrat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudContratPageRoutingModule
  ],
  declarations: [CrudContratPage]
})
export class CrudContratPageModule {}
