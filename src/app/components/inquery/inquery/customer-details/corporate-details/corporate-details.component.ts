import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import {PasswordHash} from '../../../../../auth/auth-login/password-hash';
import {Router} from '@angular/router';
import {FormValidationHelpers} from '../../../../../shared/helpers/form-validation-helpers';
import {CompanyType, TextBoxTypes} from 'src/app/shared/services/common/enum';
import {CustomerType} from 'src/app/shared/services/common/enum';
import {CustomerDetailsService} from '../../../../../shared/services/customer-details.service';


@Component({
  selector: 'app-corporate-details',
  templateUrl: './corporate-details.component.html',
  styleUrls: ['./corporate-details.component.scss']
})

export class CorporateDetailsComponent implements OnInit {
  companyType = [];


  constructor(
    private passwordHash: PasswordHash,
    private router: Router,
    private formBuilder: FormBuilder,
    private formValidationHelper: FormValidationHelpers,
    private customerservice: CustomerDetailsService
  ) {
    this.companyType = [
      {id: CompanyType.Ingenii, name: 'Ingenii'},
      {id: CompanyType.Dimo, name: 'Dimo'},
    ];
  }

  get companyName() {
    return this.corporateForm.get('companyName');
  }

  get companyRegistrationNo() {
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

  get vatNumber() {
    return this.corporateForm.get('vatNumber');
  }

  get email() {
    return this.corporateForm.get('email');
  }

  get streetAddressLineOne() {
    return this.corporateForm.get('streetAddressLineOne');
  }

  get streetAddressLineTwo() {
    return this.corporateForm.get('streetAddressLineTwo');
  }

  get handlingCompany() {
    return this.corporateForm.get('handlingCompany');
  }

  get country() {
    return this.corporateForm.get('country');
  }

  get city() {
    return this.corporateForm.get('city');
  }

  get zipCode() {
    return this.corporateForm.get('zipCode');
  }

  get taxNumber() {
    return this.corporateForm.get('taxNumber');
  }

  corporateForm: FormGroup;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;

  ngOnInit(): void {
    this.corporateForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      companyRegistrationNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      streetAddressLineOne: ['', Validators.required],
      streetAddressLineTwo: ['', Validators.required],
      handlingCompany: [this.companyType[0].id, [Validators.required]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      taxNumber: ['', Validators.required],
      vatNumber: ['', Validators.required],
      type: [CustomerType.Corporate, [Validators.required]]

    });
  }

  getCompanyId(event){
    console.log(event.id);
    this.corporateForm.value.handlingCompany = event.id;
  }


  saveCorporteDetails() {
    if (this.corporateForm.invalid) {
      this.formValidationHelper.validateAllFormFields(this.corporateForm);
      return;
    } else if (this.corporateForm.valid) {
      this.customerservice.addCustomer(this.corporateForm.value).subscribe(
        respond => {
          console.log(respond);
        });
    }
  }

}
