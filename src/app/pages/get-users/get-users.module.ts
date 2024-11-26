import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetUsersPageRoutingModule } from './get-users-routing.module';

import { GetUsersPage } from './get-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetUsersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GetUsersPage]
})
export class GetUsersPageModule {}
