import { Component, OnInit } from '@angular/core';
// import {FormGroup,FormBuilder,Validators, NgForm} from "@angular/forms";
// import {Router} from "@angular/router";
// import {AuthenticationService} from '../../../shared/services/auth/authentication.service';
// import {PasswordHash} from '../../../auth/auth-login/password-hash';
// import {FormValidationHelpers} from '../../../shared/helpers/form-validation-helpers';



@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss']
})
export class ResetPwdComponent implements OnInit {

  constructor(
    // private authService:AuthenticationService,
    // private passwordHash: PasswordHash,
    // private router:Router,
    // private formBuilder: FormBuilder,
    // private formValidationHelper: FormValidationHelpers

  ) { }

  // resetForm : FormGroup;

  ngOnInit() {
    // this.getResetFrom();
  }

  // getResetFrom(){
  //   this.resetForm = this.formBuilder.group({
  //     password : ['',Validators.required],
  //     passwordConfirmed  : ['',Validators.required]
  //   })
  // }

}
