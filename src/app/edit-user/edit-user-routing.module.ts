import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserResolver } from '../services/users-resolver.service';
import { EditUserPage } from './edit-user.page';

const routes: Routes = [
  {
    path: '',
    component: EditUserPage,
    resolve: {
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserPageRoutingModule {}
