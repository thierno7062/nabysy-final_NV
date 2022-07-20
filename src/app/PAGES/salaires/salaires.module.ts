import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalairesPageRoutingModule } from './salaires-routing.module';

import { SalairesPage } from './salaires.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalairesPageRoutingModule,
    IonicSelectableModule,
    ReactiveFormsModule
  ],
  declarations: [SalairesPage]
})
export class SalairesPageModule {}
