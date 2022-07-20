import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimePageRoutingModule } from './prime-routing.module';

import { PrimePage } from './prime.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimePageRoutingModule,
    IonicSelectableModule,
    ReactiveFormsModule
  ],
  declarations: [PrimePage]
})
export class PrimePageModule {}
