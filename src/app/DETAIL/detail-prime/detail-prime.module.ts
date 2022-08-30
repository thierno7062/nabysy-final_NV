import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPrimePageRoutingModule } from './detail-prime-routing.module';

import { DetailPrimePage } from './detail-prime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPrimePageRoutingModule
  ],
  declarations: [DetailPrimePage]
})
export class DetailPrimePageModule {}
