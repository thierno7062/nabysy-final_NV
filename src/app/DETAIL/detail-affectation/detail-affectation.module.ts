import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAffectationPageRoutingModule } from './detail-affectation-routing.module';

import { DetailAffectationPage } from './detail-affectation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailAffectationPageRoutingModule
  ],
  declarations: [DetailAffectationPage]
})
export class DetailAffectationPageModule {}
