import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccesUsersPageRoutingModule } from './acces-users-routing.module';

import { AccesUsersPage } from './acces-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesUsersPageRoutingModule
  ],
  declarations: [AccesUsersPage]
})
export class AccesUsersPageModule {}
