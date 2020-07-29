import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import {PasswordHash} from '../../../../../auth/auth-login/password-hash';
import {Router} from '@angular/router';
import {FormValidationHelpers} from '../../../../../shared/helpers/form-validation-helpers';
import { TextBoxTypes } from 'src/app/shared/services/common/enum';




@Component({
  selector: 'app-corporate-details',
  templateUrl: './corporate-details.component.html',
  styleUrls: ['./corporate-details.component.scss']
})

export class CorporateDetailsComponent implements OnInit{
  constructor(
    private passwordHash: PasswordHash,
    private router:Router,
    private formBuilder: FormBuilder,
    private formValidationHelper: FormValidationHelpers
  ) {}

  ngOnInit(): void {
    this.getCorporateForm();
  }

  corporateForm : FormGroup;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;

  getCorporateForm(){
    this.corporateForm = this.formBuilder.group({
      companyName : ['', Validators.required],
      companyRegistrationNo : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      streetAddressLineOne : ['', Validators.required],
      streetAddressLineTwo  : ['', Validators.required],
      country : ['', Validators.required],
      city : ['', Validators.required],
      zipCode : ['', Validators.required],
      // handlingCompany : ['', Validators.required],
      taxNumber : ['', Validators.required],
      vatNumber : ['', Validators.required],
      contactPerson : ['', Validators.required],
      contactNo : ['', Validators.required],

    })
  }

  HandlingCompany = [
    {id : 1, name:'Ingenii'},
    {id : 2, name:'Dimo'}
  ]

  get companyName() {
    return this.corporateForm.get('companyName');
  }
  get  companyRegistrationNo() {
    return this.corporateForm.get('companyRegistrationNo');
  }
  get contactPerson() {
    return this.corporateForm.get('contactPerson');
  }
  get contactNo() {
    return this.corporateForm.get('contactNo');
  }
  get designation() {
    return this.corporateForm.get(' designation');
  }
  get masterAccNo() {
    return this.corporateForm.get('masterAccNo');
  }
  get vatNumber() {
    return this.corporateForm.get('vatNumber');
  }
  get email() {
    return this.corporateForm.get('email');
  }
  get addressLine1() {
    return this.corporateForm.get('addressLine1');
  }
  get streetAddressLineOne() {
    return this.corporateForm.get('streetAddressLineOne');
  }
  get streetAddressLineTwo() {
    return this.corporateForm.get('streetAddressLineTwo');
  }

  get country() {
    return this.corporateForm.get('country');
  }
  get city(){
    return this.corporateForm.get('city');
  }
  get zipCode(){
    return this.corporateForm.get('zipCode');
  }
 get taxNumber(){
    return this.corporateForm.get('taxNumber');
  }

  saveCorporteDetails(){

  }

}
