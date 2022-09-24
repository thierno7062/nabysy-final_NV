import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudCreditPageRoutingModule } from './crud-credit-routing.module';

import { CrudCreditPage } from './crud-credit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudCreditPageRoutingModule
  ],
  declarations: [CrudCreditPage]
})
export class CrudCreditPageModule {}
