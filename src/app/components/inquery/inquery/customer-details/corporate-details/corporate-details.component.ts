import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import {PasswordHash} from '../../../../../auth/auth-login/password-hash';
import {Router} from '@angular/router';
import {FormValidationHelpers} from '../../../../../shared/helpers/form-validation-helpers';




@Component({
  selector: 'app-corporate-details',
  templateUrl: './corporate-details.component.html',
  styleUrls: ['./corporate-details.component.scss']
})

export class CorporateDetailsComponent{
  constructor(
    private passwordHash: PasswordHash,
    private router:Router,
    private formBuilder: FormBuilder,
    private formValidationHelper: FormValidationHelpers
  ) {}





}
