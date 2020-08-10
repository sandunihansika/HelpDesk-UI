import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

Injectable();

export class FormValidationHelpers {
  constructor() {
  }

  validateAllFormFields(formGroup: FormGroup) {  // save when fileds without filled
    console.log(formGroup);
    Object.keys(formGroup.controls).forEach(fields => {
      const control = formGroup.get('field');
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
