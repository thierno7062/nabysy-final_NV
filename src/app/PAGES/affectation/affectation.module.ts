import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AffectationPageRoutingModule } from './affectation-routing.module';

import { AffectationPage } from './affectation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AffectationPageRoutingModule
  ],
  declarations: [AffectationPage]
})
export class AffectationPageModule {}
