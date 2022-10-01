import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudCreditPageRoutingModule } from './crud-credit-routing.module';

import { CrudCreditPage } from './crud-credit.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    IonicModule,
    CrudCreditPageRoutingModule
  ],
  declarations: [CrudCreditPage]
})
export class CrudCreditPageModule {}
