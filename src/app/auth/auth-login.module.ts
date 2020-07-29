import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {AuthEvent} from './auth-login/auth-event';
import {PasswordHash} from './auth-login/password-hash';
import {CardModule} from 'primeng/card';
import {AuthLoginComponent} from './auth-login/auth-login.component';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
    AuthLoginComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CardModule,
    SharedModule,
    AuthRoutingModule


  ],
  exports : [
    AuthComponent,
    AuthLoginComponent

  ],
  providers: [
    AuthEvent,
    PasswordHash

  ]
})
export class AuthLoginModule { }
