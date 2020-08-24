import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Directive} from '@angular/core';

// export function myValidator(control: AbstractControl): {[key: string]: any} | null {
//   if(true){
//     console.log('my validation is activated');
//     return { 'myValidation': { value: control.value } };
//   }
// }

@Directive({
  selector: '[customValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
})
export class CustomValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return { 'custom': true };
  }
}
