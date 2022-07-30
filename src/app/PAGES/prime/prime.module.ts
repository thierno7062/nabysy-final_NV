import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimePageRoutingModule } from './prime-routing.module';

import { PrimePage } from './prime.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimePageRoutingModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    NgCalendarModule,
  ],
  declarations: [PrimePage]
})
export class PrimePageModule {}
