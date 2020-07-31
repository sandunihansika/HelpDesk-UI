import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import {CustomerDetails} from './customer-details';
import {FormValidationHelpers} from '../../../../../shared/helpers/form-validation-helpers';
import {TextBoxTypes} from '../../../../../shared/services/common/enum';
import {CustomerDetailsService} from '../../../../../shared/services/customer-details.service';
import {CustomerType} from '../../../../../shared/services/common/enum';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customersForm: FormGroup;
  customer: CustomerDetails;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  male: string;
  female: string;

  constructor(
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private customerservice: CustomerDetailsService
  ) {
    this.customer = new CustomerDetails();
  }

  ngOnInit(): void {
    this.customersForm = this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      nic: ['', [Validators.required, Validators.minLength(10)]],
      ppNo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telNo: ['', [Validators.required, Validators.minLength(10)]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      type: [CustomerType.Individual, [Validators.required]]
    });
  }

  // patchValues() {
  //   if (this.customer) {
  //     this.customersForm.patchValue({
  //       firstName: this.customer.firstName ? this.customer.firstName : '',
  //       LastName: this.customer.LastName ? this.customer.LastName : '',
  //       NIC: this.customer.NIC ? this.customer.NIC : '',
  //       Email: this.customer.Email ? this.customer.Email : '',
  //       TelNo: this.customer.TelNo ? this.customer.TelNo : '',
  //       Address: this.customer.Address ? this.customer.Address : '',
  //       Gender: this.customer.Gender ? this.customer.Gender : ''
  //     });
  //   }
  // }

  saveCustomer() {
    console.log(this.customersForm.value);
    if (this.customersForm.invalid) {
      this.formvalidationhelpers.validateAllFormFields(this.customersForm);
      return;
    } else if (this.customersForm.valid) {
      this.customerservice.addCustomer(this.customersForm.value, this.customer.nic).subscribe(
        respond => {
          /**/
        });
    }
  }

  get firstName() {
    return this.customersForm.get('firstName');
  }

  get lastName() {
    return this.customersForm.get('lastName');
  }

  get nic() {
    return this.customersForm.get('nic');
  }

  get email() {
    return this.customersForm.get('email');
  }

  get telNo() {
    return this.customersForm.get('telNo');
  }

  get addressLine1() {
    return this.customersForm.get('addressLine1');
  }

  get addressLine2() {
    return this.customersForm.get('addressLine2');
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

  get zip() {
    return this.customersForm.get('zip');
  }


}
