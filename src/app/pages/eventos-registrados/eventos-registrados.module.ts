import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosRegistradosPageRoutingModule } from './eventos-registrados-routing.module';

import { EventosRegistradosPage } from './eventos-registrados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventosRegistradosPageRoutingModule
  ],
  declarations: [EventosRegistradosPage]
})
export class EventosRegistradosPageModule {}
