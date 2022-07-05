import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudAbsencePageRoutingModule } from './crud-absence-routing.module';

import { CrudAbsencePage } from './crud-absence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudAbsencePageRoutingModule
  ],
  declarations: [CrudAbsencePage]
})
export class CrudAbsencePageModule {}
