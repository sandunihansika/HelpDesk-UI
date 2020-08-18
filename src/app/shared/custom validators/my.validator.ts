import {AbstractControl} from '@angular/forms';

export function myValidator(control: AbstractControl): {[key: string]: any} | null {
  if(control.value.touched){
    return { 'myValidation': 'working' };
  }
}
