import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import {CustomerDetails} from './customer-details';
import {FormValidationHelpers} from '../../../../../shared/helpers/form-validation-helpers';
import {CompanyType, TextBoxTypes} from '../../../../../shared/services/common/enum';
import {CustomerDetailsService} from '../../../../../shared/services/customer-details.service';
import {CustomerType} from '../../../../../shared/services/common/enum';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customersForm: FormGroup;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  companyType = [];

  constructor(
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private customerservice: CustomerDetailsService
  ) {
    this.companyType = [
      {id: CompanyType.Ingenii, name: 'Ingenii'},
      {id: CompanyType.Dimo, name: 'Dimo'},
    ];
  }


  get firstName() {
    return this.customersForm.get('firstName');
  }

  get lastName() {
    return this.customersForm.get('lastName');
  }

  get nicNumber() {
    return this.customersForm.get('nicNumber');
  }

  get email() {
    return this.customersForm.get('email');
  }

  get telNo() {
    return this.customersForm.get('telNo');
  }

  get streetAddressLineOne() {
    return this.customersForm.get('streetAddressLineOne');
  }

  get streetAddressLineTwo() {
    return this.customersForm.get('streetAddressLineTwo');
  }

  get ppNo() {
    return this.customersForm.get('ppNo');
  }

  get city() {
    return this.customersForm.get('city');
  }

  get country() {
    return this.customersForm.get('country');
  }

  get zipCode() {
    return this.customersForm.get('zipCode');
  }

  get handlingCompany() {
    return this.customersForm.get('handlingCompany');
  }

  ngOnInit(): void {
    this.customersForm = this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      nicNumber: [''],
      ppNo: [''],
      email: ['', [Validators.required, Validators.email]],
      telNo: ['', [Validators.required]],
      handlingCompany: [this.companyType[0].id, [Validators.required]],
      streetAddressLineOne: ['', [Validators.required]],
      streetAddressLineTwo: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      type: [CustomerType.Individual, [Validators.required]]
    });
  }

  getCompanyId(event) {
    console.log(event.id);
    this.customersForm.value.handlingCompany = event.id;
  }


  saveCustomer() {
    if (this.customersForm.invalid) {
      this.formvalidationhelpers.validateAllFormFields(this.customersForm);
      return;
    } else if (this.customersForm.valid) {
      this.customerservice.addCustomer(this.customersForm.value).subscribe(
        respond => {
          console.log(respond);
        });
    }
  }


}
