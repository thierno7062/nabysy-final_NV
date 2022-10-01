import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudAbsencePageRoutingModule } from './crud-absence-routing.module';

import { CrudAbsencePage } from './crud-absence.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    CrudAbsencePageRoutingModule
  ],
  declarations: [CrudAbsencePage]
})
export class CrudAbsencePageModule {}
