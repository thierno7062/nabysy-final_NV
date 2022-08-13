import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudPrimePageRoutingModule } from './crud-prime-routing.module';

import { CrudPrimePage } from './crud-prime.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    CrudPrimePageRoutingModule
  ],
  declarations: [CrudPrimePage]
})
export class CrudPrimePageModule {}
