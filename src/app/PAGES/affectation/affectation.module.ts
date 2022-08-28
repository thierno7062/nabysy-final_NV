import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AffectationPageRoutingModule } from './affectation-routing.module';

import { AffectationPage } from './affectation.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AffectationPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AffectationPage]
})
export class AffectationPageModule {}
