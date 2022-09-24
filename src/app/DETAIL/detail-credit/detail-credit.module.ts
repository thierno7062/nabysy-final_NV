import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCreditPageRoutingModule } from './detail-credit-routing.module';

import { DetailCreditPage } from './detail-credit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCreditPageRoutingModule
  ],
  declarations: [DetailCreditPage]
})
export class DetailCreditPageModule {}
