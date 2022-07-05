import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailEmployePageRoutingModule } from './detail-employe-routing.module';

import { DetailEmployePage } from './detail-employe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailEmployePageRoutingModule
  ],
  declarations: [DetailEmployePage]
})
export class DetailEmployePageModule {}
