import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudDirectionPageRoutingModule } from './crud-direction-routing.module';

import { CrudDirectionPage } from './crud-direction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudDirectionPageRoutingModule
  ],
  declarations: [CrudDirectionPage]
})
export class CrudDirectionPageModule {}
