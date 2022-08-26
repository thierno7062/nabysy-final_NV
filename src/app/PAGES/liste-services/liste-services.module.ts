import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeServicesPageRoutingModule } from './liste-services-routing.module';

import { ListeServicesPage } from './liste-services.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeServicesPageRoutingModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListeServicesPage]
})
export class ListeServicesPageModule {}
