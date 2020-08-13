import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidationHelpers} from '../../../../../shared/helpers/form-validation-helpers';
import {CustomerDetailsService} from '../../../../../shared/services/customer-details.service';
import {CompanyCustomerDeails} from './CompanyCustomerDeails';
import {CompanyType, CustomerType, InqueryType, TextBoxTypes} from '../../../../../shared/services/common/enum';


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
  cTypes: typeof CustomerType = CustomerType;
  customerType: CustomerType;
  InqueryType = [];
  companyType = [];

  constructor(
    private customerservice: CustomerDetailsService,
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers
  ) {
    this.companyCustomerDetails = new CompanyCustomerDeails();
    this.InqueryType = [
      {id: InqueryType.Details, name: 'Details'},
      {id: InqueryType.Quotation, name: 'Quotation'},
      {id: InqueryType.Quotation_with_details, name: 'Quotation with Details'}
    ];

    this.companyType = [
      {id: CompanyType.Ingenii, name: 'Ingenii'},
      {id: CompanyType.Dimo, name: 'Dimo'},
    ];
    this.allcustomers = [{
      id:1, name:"rambo"
    }]

  }


  customers = []; /*array of customers to get respond*/
  allcustomers = [];

  putintoDropdown(id, fName) {
    console.log(id + ',' + fName);
    this.allcustomers = [{
      id: id, name: fName
    }];
    // console.log(this.allcustomers);
  }


  ngOnInit(): void {
    this.individualCorpCustomerForm = this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      nic: [''],
      email: ['', [Validators.required, Validators.email]],
      telNo: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
      type: ['', [Validators.required]],
      contactPerson: [''],
      contactNo: ['', [Validators.minLength(10)]],
      companyName: ['', [Validators.required]],
      companyRegistrationNo: ['', [Validators.required]],
      streetAddressLineOne: ['', [Validators.required]],
      streetAddressLineTwo: ['', [Validators.required]],
      ppNo: [''],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      taxNumber: ['', [Validators.required]],
      vatNumber: ['', [Validators.required]],
      handlingCompany: [this.companyType[0].id, [Validators.required]], /*value by dropdown*/
      handlingCustomer: ['', [Validators.required]], /*value by dropdown*/
      inqueryType: ['', [Validators.required]],
      customerStatus: ['exist']
    });
    console.log(this.individualCorpCustomerForm.value.customerStatus);
    this.getCustomer(); //send the handlingcompany
  }


  getCustomerStuatus(status) { //radio event to select customer status
    console.log(status.value);
    if (status === 'new') {
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
    this.getCustomer();
    console.log(this.individualCorpCustomerForm.value.handlingCompany);
  }

  filterCustomerDetails(cid) {
    const customerData = this.customers.filter(c => c.id === cid); //efficiency improved
    console.log(this.customerData[0].type);

    if (this.customerData[0].type == CustomerType.Corporate) {
      this.patchToCustomer(customerData);
    }
    if (this.customerData[0].type == CustomerType.Individual) {
      this.patchToCustomer(customerData); //call for patch the individual customer
    }

  }

  patchToCustomer(customerValue) {
    // console.log(customerValue);
    this.individualCorpCustomerForm.patchValue({
      firstName: customerValue[0].firstName ? customerValue[0].firstName : '',
      lastName: customerValue[0].lastName ? customerValue[0].lastName : '',
      nic: customerValue[0].nic ? customerValue[0].nic : '',
      email: customerValue[0].email ? customerValue[0].email : '',
      telNo: customerValue[0].telNo ? customerValue[0].telNo : '',
      address: customerValue[0].address ? customerValue[0].address : '',
      type: customerValue[0].type ? customerValue[0].type : '',
      companyName: customerValue[0].companyName ? customerValue[0].companyName : '',
      companyRegistrationNo: customerValue[0].companyRegistrationNo ? customerValue[0].companyRegistrationNo : '',
      streetAddressLineOne: customerValue[0].streetAddressLineOne ? customerValue[0].streetAddressLineOne : '',
      streetAddressLineTwo: customerValue[0].streetAddressLineTwo ? customerValue[0].streetAddressLineTwo : '',
      ppNo: customerValue[0].ppNo ? customerValue[0].ppNo : '',
      country: customerValue[0].country ? customerValue[0].country : '',
      city: customerValue[0].city ? customerValue[0].city : '',
      zipCode: customerValue[0].zipCode ? customerValue[0].zipCode : '',
      taxNumber: customerValue[0].taxNumber ? customerValue[0].taxNumber : '',
      vatNumber: customerValue[0].vatNumber ? customerValue[0].vatNumber : '',
      handlingCompany: customerValue[0].handlingCompany ? customerValue[0].handlingCompany : '', //dropdown values
      handlingCustomer: customerValue[0].handlingCustomer ? customerValue[0].handlingCustomer : '', //dropdown values
      // contactPerson: customerValue[0].contactPerson ? customerValue[0].contactPerson : '',
      // contactNo: customerValue[0].contactNo ? customerValue[0].contactNo : '',

      /*no need to patch for contactNo and contact person*/
    });
  }

  getCustomer() {
    // if (this.individualCorpCustomerForm.invalid) {
    //   this.formvalidationhelpers.validateAllFormFields(this.individualCorpCustomerForm);
    //   return;
    // } else if (this.individualCorpCustomerForm.valid) {
    this.customerservice.getCustomerDetails(this.individualCorpCustomerForm.value.handlingCompany).subscribe(
      respond => {
        this.customers = respond.data; //getting data array into customer array
        console.log(this.customers);
        this.customers.forEach(i => {
          this.putintoDropdown(i.id, i.firstName);
        });
        // console.log(this.customers[0]);
        //when page load first array element get
        this.patchToCustomer(this.customers[0]); // call to patch the selected customer
      });
    // }
  }

  saveInquery() {
    console.log(this.individualCorpCustomerForm.value);
    if (this.individualCorpCustomerForm.invalid) {
      this.formvalidationhelpers.validateAllFormFields(this.individualCorpCustomerForm);
      return;
    } else if (this.individualCorpCustomerForm.valid) {
      this.customerservice.addInquery(this.individualCorpCustomerForm.value).subscribe(
        respond => {
          /**/
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

  get ppNo() {
    return this.individualCorpCustomerForm.get('ppNo');
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

  get inqueryType() {
    return this.individualCorpCustomerForm.get('inqueryType');
  }

  get customerStatus() {
    return this.individualCorpCustomerForm.get('customerStatus');
  }


}
