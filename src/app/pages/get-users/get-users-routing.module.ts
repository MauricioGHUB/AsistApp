import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetUsersPage } from './get-users.page';

const routes: Routes = [
  {
    path: '',
    component: GetUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetUsersPageRoutingModule {}
