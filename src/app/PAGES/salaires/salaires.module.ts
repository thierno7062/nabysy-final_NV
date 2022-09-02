import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalairesPageRoutingModule } from './salaires-routing.module';

import { SalairesPage } from './salaires.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalairesPageRoutingModule,
    IonicSelectableModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    ReactiveFormsModule
  ],
  declarations: [SalairesPage]
})
export class SalairesPageModule {}
