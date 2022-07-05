import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeServicesPageRoutingModule } from './liste-services-routing.module';

import { ListeServicesPage } from './liste-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeServicesPageRoutingModule
  ],
  declarations: [ListeServicesPage]
})
export class ListeServicesPageModule {}
