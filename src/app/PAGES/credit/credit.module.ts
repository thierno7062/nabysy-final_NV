import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditPageRoutingModule } from './credit-routing.module';

import { CreditPage } from './credit.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    IonicModule,
    CreditPageRoutingModule
  ],
  declarations: [CreditPage]
})
export class CreditPageModule {}
