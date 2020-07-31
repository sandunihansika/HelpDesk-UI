import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import {FormValidationHelpers} from '../../../../../shared/helpers/form-validation-helpers';
import {CustomerDetailsService} from '../../../../../shared/services/customer-details.service';
import {CompanyCustomerDeails} from './CompanyCustomerDeails';
import {CustomerType} from '../../../../../shared/services/common/enum';
import {CompanyType} from '../../../../../shared/services/common/enum';
import {TextBoxTypes} from '../../../../../shared/services/common/enum';

@Component({
  selector: 'app-customer-handling',
  templateUrl: './customer-handling.component.html',
  styleUrls: ['./customer-handling.component.scss']
})
export class CustomerHandlingComponent implements OnInit {

  individualCorpCustomerForm: FormGroup;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  companyCustomerDetails: CompanyCustomerDeails;
  customerData;
  selectedCustomer: {
    id: number
  };

  new: string;
  exist: string;
  selectedValue: string;
  formEnable: boolean = true;
  display: boolean;

  constructor(
    private customerService: CustomerDetailsService,
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers
  ) {
    this.companyCustomerDetails = new CompanyCustomerDeails();
  }


  ngOnInit(): void {
    this.selectedValue = 'exist';
    console.log(this.selectedValue);

    this.individualCorpCustomerForm = this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      nic: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      telNo: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      type: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      contactNo: ['', [Validators.required, Validators.minLength(10)]],
      companyName: ['', [Validators.required]],
      companyRegistrationNo: ['', [Validators.required]],
      streetAddressLineOne: ['', [Validators.required]],
      streetAddressLineTwo: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      taxNumber: ['', [Validators.required]],
      vatNumber: ['', [Validators.required]],
      handlingCompany: [CompanyType.Ingenii, [Validators.required]], /*value by dropdown*/
      handlingCustomer: ['', [Validators.required]] /*value by dropdown*/
    });
    this.saveCustomer();
    this.customerData = this.customers[0]; //when page load first array element get
    this.patchToCustomer(); // call to patch the selected customer

  }

  customers = []; /*array of customers */


  getCustomerStuatus(value) { //radio event to select customer status
    console.log(value);
    if (value === 'new') {
      this.formEnable = false;
      // console.log(this.formEnable);
    } else {
      this.formEnable = true;
      // console.log(this.formEnable);
    }
  }

  getCustomerId(event) { //dropdown event when select customer
    this.selectedCustomer.id = event.id;
    this.filterCustomerDetails(this.selectedCustomer.id);
  }

  getCompanySelected(event) { //dropdown event
    this.individualCorpCustomerForm.value.handlingCompany = event.id;  //when event fired need to find the relevant id customer form the array

  }

  filterCustomerDetails(cid) {
    this.customerData = this.customers.filter(c => c.id === cid);
    console.log(this.customerData[0].type);

    if (this.customerData[0].type == CustomerType.Corporate) {
      this.patchToCustomer();
      this.display = true;
    }
    if (this.customerData[0].type == CustomerType.Individual) {
      this.patchToCustomer(); //call for patch the individual customer
      this.display = false;
    }

  }

  patchToCustomer() {
    this.individualCorpCustomerForm.patchValue({
      firstName: this.customerData[0].firstName ? this.customerData[0].firstName : '',
      lastName: this.customerData[0].lastName ? this.customerData[0].lastName : '',
      nic: this.customerData[0].nic ? this.customerData[0].nic : '',
      email: this.customerData[0].email ? this.customerData[0].email : '',
      telNo: this.customerData[0].telNo ? this.customerData[0].telNo : '',
      address: this.customerData[0].address ? this.customerData[0].address : '',
      type: this.customerData[0].type ? this.customerData[0].type : '',
      companyName: this.customerData[0].companyName ? this.customerData[0].companyName : '',
      companyRegistrationNo: this.customerData[0].companyRegistrationNo ? this.customerData[0].companyRegistrationNo : '',
      streetAddressLineOne: this.customerData[0].streetAddressLineOne ? this.customerData[0].streetAddressLineOne : '',
      streetAddressLineTwo: this.customerData[0].streetAddressLineTwo ? this.customerData[0].streetAddressLineTwo : '',
      country: this.customerData[0].country ? this.customerData[0].country : '',
      city: this.customerData[0].city ? this.customerData[0].city : '',
      zipCode: this.customerData[0].zipCode ? this.customerData[0].zipCode : '',
      taxNumber: this.customerData[0].taxNumber ? this.customerData[0].taxNumber : '',
      vatNumber: this.customerData[0].vatNumber ? this.customerData[0].vatNumber : '',
      handlingCompany: this.customerData[0].handlingCompany ? this.customerData[0].handlingCompany : '', //dropdown values
      handlingCustomer: this.customerData[0].handlingCustomer ? this.customerData[0].handlingCustomer : '', //dropdown values
      // contactPerson: this.customerData[0].contactPerson ? this.customerData[0].contactPerson : '',
      // contactNo: this.customerData[0].contactNo ? this.customerData[0].contactNo : '',

      /*no need to patch for contactNo and contact person*/
    });
  }

  saveCustomer() {
    if (this.individualCorpCustomerForm.invalid) {
      this.formvalidationhelpers.validateAllFormFields(this.individualCorpCustomerForm);
      return;
    } else if (this.individualCorpCustomerForm.valid) {
      this.customerService.getCustomerDetails(this.individualCorpCustomerForm.value).subscribe(
        respond => {
          this.customers = respond;
          console.log(this.customers);
        });
    }
  }

  get firstName() {
    return this.individualCorpCustomerForm.get('firstName');
  }

  get lastName() {
    return this.individualCorpCustomerForm.get('lastName');
  }

  get nic() {
    return this.individualCorpCustomerForm.get('nic');
  }

  get email() {
    return this.individualCorpCustomerForm.get('email');
  }

  get telNo() {
    return this.individualCorpCustomerForm.get('telNo');
  }

  get address() {
    return this.individualCorpCustomerForm.get('address');
  }

  get companyName() {
    return this.individualCorpCustomerForm.get('companyName');
  }

  get companyRegistrationNo() {
    return this.individualCorpCustomerForm.get('companyRegistrationNo');
  }

  get streetAddressLineOne() {
    return this.individualCorpCustomerForm.get('streetAddressLineOne');
  }

  get streetAddressLineTwo() {
    return this.individualCorpCustomerForm.get('streetAddressLineTwo');
  }

  get country() {
    return this.individualCorpCustomerForm.get('country');
  }

  get city() {
    return this.individualCorpCustomerForm.get('city');
  }

  get zipCode() {
    return this.individualCorpCustomerForm.get('zipCode');
  }

  get taxNumber() {
    return this.individualCorpCustomerForm.get('taxNumber');
  }

  get vatNumber() {
    return this.individualCorpCustomerForm.get('vatNumber');
  }

  get contactPerson() {
    return this.individualCorpCustomerForm.get('contactPerson');
  }

  get contactNo() {
    return this.individualCorpCustomerForm.get('contactNo');
  }

  get handlingCustomer() {
    return this.individualCorpCustomerForm.get('handlingCustomer');
  }

  get handlingCompany() {
    return this.individualCorpCustomerForm.get('handlingCompany');
  }


}
