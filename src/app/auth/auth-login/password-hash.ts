import {Injectable} from "@angular/core";

import jsSHA from "jssha";
@Injectable()

export class PasswordHash{
  constructor() {
  }

  hashPassword(password:string){
    console.log(password);
    const newSaltPassword = password   //salt the password before hashing(randomly generated it.reduce the dictionary lookups)
      .split('')
      .reverse()
      .join('')
    ;
    console.log(newSaltPassword);
    const newShaPassword = new jsSHA('SHA-256', 'TEXT');
    newShaPassword.update(newSaltPassword);
    console.log(newShaPassword);
    return newShaPassword.getHash('HEX');

  }

}
