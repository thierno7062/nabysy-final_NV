import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudAffectationPageRoutingModule } from './crud-affectation-routing.module';

import { CrudAffectationPage } from './crud-affectation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudAffectationPageRoutingModule
  ],
  declarations: [CrudAffectationPage]
})
export class CrudAffectationPageModule {}
