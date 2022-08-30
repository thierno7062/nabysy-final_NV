import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudSousDirectionPageRoutingModule } from './crud-sous-direction-routing.module';

import { CrudSousDirectionPage } from './crud-sous-direction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudSousDirectionPageRoutingModule
  ],
  declarations: [CrudSousDirectionPage]
})
export class CrudSousDirectionPageModule {}
