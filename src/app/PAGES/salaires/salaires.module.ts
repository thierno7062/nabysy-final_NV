import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalairesPageRoutingModule } from './salaires-routing.module';

import { SalairesPage } from './salaires.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalairesPageRoutingModule
  ],
  declarations: [SalairesPage]
})
export class SalairesPageModule {}
