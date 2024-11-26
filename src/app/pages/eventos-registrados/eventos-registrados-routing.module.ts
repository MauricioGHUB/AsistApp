import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventosRegistradosPage } from './eventos-registrados.page';

const routes: Routes = [
  {
    path: '',
    component: EventosRegistradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosRegistradosPageRoutingModule {}
