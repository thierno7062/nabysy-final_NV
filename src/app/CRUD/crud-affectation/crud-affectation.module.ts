import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudAffectationPageRoutingModule } from './crud-affectation-routing.module';

import { CrudAffectationPage } from './crud-affectation.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudAffectationPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CrudAffectationPage]
})
export class CrudAffectationPageModule {}
