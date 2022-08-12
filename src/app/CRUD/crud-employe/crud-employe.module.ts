import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudEmployePageRoutingModule } from './crud-employe-routing.module';

import { CrudEmployePage } from './crud-employe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    CrudEmployePageRoutingModule
  ],
  declarations: [CrudEmployePage]
})
export class CrudEmployePageModule {}
