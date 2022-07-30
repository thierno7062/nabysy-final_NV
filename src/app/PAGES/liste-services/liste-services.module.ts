import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeServicesPageRoutingModule } from './liste-services-routing.module';

import { ListeServicesPage } from './liste-services.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeServicesPageRoutingModule,
    IonicSelectableModule,
    ReactiveFormsModule
  ],
  declarations: [ListeServicesPage]
})
export class ListeServicesPageModule {}
