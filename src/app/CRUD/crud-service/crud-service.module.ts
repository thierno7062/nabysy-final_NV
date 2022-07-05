import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudServicePageRoutingModule } from './crud-service-routing.module';

import { CrudServicePage } from './crud-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudServicePageRoutingModule
  ],
  declarations: [CrudServicePage]
})
export class CrudServicePageModule {}
