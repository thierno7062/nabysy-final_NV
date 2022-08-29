import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoviewerPageRoutingModule } from './photoviewer-routing.module';

import { PhotoviewerPage } from './photoviewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoviewerPageRoutingModule
  ],
  declarations: [PhotoviewerPage]
})
export class PhotoviewerPageModule {}
