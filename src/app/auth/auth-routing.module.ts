import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthLoginComponent} from './auth-login/auth-login.component';

const routes: Routes = [

  {
    path : '',
    children : [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path : 'login',
        component : AuthLoginComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
