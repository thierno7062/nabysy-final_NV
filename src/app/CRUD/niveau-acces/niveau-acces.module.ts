import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NiveauAccesPageRoutingModule } from './niveau-acces-routing.module';

import { NiveauAccesPage } from './niveau-acces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NiveauAccesPageRoutingModule
  ],
  declarations: [NiveauAccesPage]
})
export class NiveauAccesPageModule {}
