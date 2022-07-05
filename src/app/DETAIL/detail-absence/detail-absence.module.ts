import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAbsencePageRoutingModule } from './detail-absence-routing.module';

import { DetailAbsencePage } from './detail-absence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailAbsencePageRoutingModule
  ],
  declarations: [DetailAbsencePage]
})
export class DetailAbsencePageModule {}
