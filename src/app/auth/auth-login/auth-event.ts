import { EventEmitter } from '@angular/core';

export class AuthEvent{
  UserLoggedIn: EventEmitter<any> = new EventEmitter();
}
