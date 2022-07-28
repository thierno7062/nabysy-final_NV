import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintBulletin2PageRoutingModule } from './print-bulletin2-routing.module';

import { PrintBulletin2Page } from './print-bulletin2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintBulletin2PageRoutingModule
  ],
  declarations: [PrintBulletin2Page]
})
export class PrintBulletin2PageModule {}
