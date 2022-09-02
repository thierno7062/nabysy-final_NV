import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailSalairePageRoutingModule } from './detail-salaire-routing.module';

import { DetailSalairePage } from './detail-salaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailSalairePageRoutingModule
  ],
  declarations: [DetailSalairePage]
})
export class DetailSalairePageModule {}
