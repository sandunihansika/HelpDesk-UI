import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import {CustomerDetails} from './customer-details';
import {FormValidationHelpers} from '../../../../../shared/helpers/form-validation-helpers';
import {TextBoxTypes} from '../../../../../shared/services/common/enum';
import {CustomerDetailsService} from '../../../../../shared/services/customer-details.service';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customersForm: FormGroup;
  customer: CustomerDetails;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;

  constructor(
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private customerservice: CustomerDetailsService
  ) {
    this.customer = new CustomerDetails();
  }

  ngOnInit(): void {
    this.customersForm = this.formbuilder.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      NIC: ['', [Validators.required, Validators.minLength(10)]],
      Email: ['', [Validators.required, Validators.email]],
      TelNo: ['', [Validators.required, Validators.minLength(10)]],
      Address: ['', [Validators.required]],
      Gender: ['', [Validators.required]]
    });
  }

  patchValues() {
    if (this.customer) {
      this.customersForm.patchValue({
        FirstName: this.customer.FirstName ? this.customer.FirstName : '',
        LastName: this.customer.LastName ? this.customer.LastName : '',
        NIC: this.customer.NIC ? this.customer.NIC : '',
        Email: this.customer.Email ? this.customer.Email : '',
        TelNo: this.customer.TelNo ? this.customer.TelNo : '',
        Address: this.customer.Address ? this.customer.Address : '',
        Gender: this.customer.Gender ? this.customer.Gender : ''
      });
    }
  }

  saveCustomer() {
    console.log(this.customersForm.value);
    if (this.customersForm.invalid) {
      this.formvalidationhelpers.validateAllFormFields(this.customersForm);
      return;
    } else if (this.customersForm.valid) {
      this.customerservice.addCustomer(this.customersForm.value, this.customer.NIC).subscribe(
        respond => {
          /**/
        });
    }
  }

  editCustomer() {
    this.patchValues();
  }

  get FirstName() {
    return this.customersForm.get('FirstName');
  }

  get LastName() {
    return this.customersForm.get('LastName');
  }

  get NIC() {
    return this.customersForm.get('NIC');
  }

  get Email() {
    return this.customersForm.get('Email');
  }

  get TelNo() {
    return this.customersForm.get('TelNo');
  }

  get Address() {
    return this.customersForm.get('Address');
  }

  get Gender() {
    return this.customersForm.get('Gender');
  }

}
