import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
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
  customerData: any[];

  new: string;
  exist: string;
  selectedValue: string;
  formEnable: boolean = true;
  display: boolean;
  displayCop: boolean;
  displayTypedrop: boolean;
  cTypes: typeof CustomerType = CustomerType;
  customerType: CustomerType;
  InqueryTypeArray = [];
  companyTypeArray = [];
  customerTypeArray = [];


  constructor(
    private customerservice: CustomerDetailsService,
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers
  ) {
    this.companyCustomerDetails = new CompanyCustomerDeails();
    this.InqueryTypeArray = [
      {id: InqueryType.Quotation, name: 'Quotation'},
      {id: InqueryType.Details, name: 'Details'},
      {id: InqueryType.Quotation_with_details, name: 'Quotation with Details'}
    ];

    this.companyTypeArray = [
      {id: CompanyType.Ingenii, name: 'Ingenii'},
      {id: CompanyType.Dimo, name: 'Dimo'},
    ];

    this.customerTypeArray = [
      {id: CustomerType.Individual, name: 'Individual'},
      {id: CustomerType.Corporate, name: 'Corporate'}
    ];
  }


  customers = []; /*array of customers to get respond*/
  allcustomers = [];
  showCustomers = [];


  ngOnInit(): void {
    this.individualCorpCustomerForm = this.formbuilder.group({
      id: [null],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      nicNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      telNo: ['', [Validators.required, Validators.minLength(10)]],
      type: ['', [Validators.required]],
      contactPerson: [''],
      contactNo: ['', [Validators.minLength(10)]],
      companyName: ['', [Validators.required]],
      companyRegistrationNo: ['', [Validators.required]],
      streetAddressLineOne: ['', [Validators.required]],
      streetAddressLineTwo: ['', [Validators.required]],
      ppNo: '',
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      taxNumber: ['', [Validators.required]],
      vatNumber: ['', [Validators.required]],
      handlingCompany: [this.companyTypeArray[0].id, [Validators.required]], /*value by dropdown*/
      handlingCustomer: ['', [Validators.required]], /*value by dropdown*/
      inqueryType: [InqueryType.Quotation, [Validators.required]],
      customerStatus: ['exist']
    });
    console.log(this.individualCorpCustomerForm.value.handlingCompany);
    console.log(this.individualCorpCustomerForm.value.customerStatus);
    this.getCustomer(); //send the handlingcompany
  }


  getCustomerStuatus(status, form: FormGroupDirective) { //radio event to select customer status
    if (status.value === 'new') {
      console.log(status.value);
      console.log(this.customerType);
      this.individualCorpCustomerForm.value.customerStatus = status.value;
      this.individualCorpCustomerForm.value.handlingCompany = this.companyTypeArray[0].id;
      this.customerType = CustomerType.Individual;
      this.resetFormControls();
      this.displayTypedrop = true;
      this.formEnable = false;
    } else {
      console.log(status.value);
      // this.displayCop = false;
      this.formEnable = true;
      this.customerType = this.customers[0].type; //reset custom type to customers[0]
      this.patchToCustomer(this.customers[0]);
    }
  }

  getCustomerTypeId(event) {
    if (event.id === CustomerType.Individual) {
      this.customerType = CustomerType.Individual;
      this.individualCorpCustomerForm.value.type = event.id;
      console.log(this.individualCorpCustomerForm.value.type);
    } else {
      this.customerType = CustomerType.Corporate;
      this.individualCorpCustomerForm.value.type = event.id;
      console.log(this.individualCorpCustomerForm.value.type);
    }
  }

  getCustomerId(event) { //dropdown event when select customer
    this.companyCustomerDetails.id = event.id;
    this.filterCustomerDetails(this.companyCustomerDetails.id);
  }

  getCompanySelected(event) { //dropdown event
    if (this.individualCorpCustomerForm.value.customerStatus == 'exist') {
      this.individualCorpCustomerForm.value.handlingCompany = event.id;  //when event fired need to find the relevant id customer form the array
      this.allcustomers = [''];
      this.getCustomer();
      console.log(this.individualCorpCustomerForm.value.handlingCompany);
    } else {
      this.individualCorpCustomerForm.value.handlingCompany = event.id;
      this.allcustomers = [''];
    }

  }

  filterCustomerDetails(id) {
    this.customerData = this.customers.filter(c => c.id === id);
    console.log(this.customerData[0].type);
    this.customerType = this.customerData[0].type; //display
    if (this.customerData[0].type == CustomerType.Corporate) {
      this.patchToCustomer(this.customerData[0]);
    }
    if (this.customerData[0].type == CustomerType.Individual) {
      this.patchToCustomer(this.customerData[0]); //call for patch the individual customer
    }

  }

  patchToCustomer(customerValue) {
    console.log(customerValue);
    this.individualCorpCustomerForm.patchValue({
      id: customerValue.id ? customerValue.id : '',
      firstName: customerValue.firstName ? customerValue.firstName : '',
      lastName: customerValue.lastName ? customerValue.lastName : '',
      nicNumber: customerValue.nicNumber ? customerValue.nicNumber : '',
      email: customerValue.email ? customerValue.email : '',
      telNo: customerValue.telNo ? customerValue.telNo : '',
      type: customerValue.type ? customerValue.type : '',
      companyName: customerValue.companyName ? customerValue.companyName : '',
      companyRegistrationNo: customerValue.companyRegistrationNo ? customerValue.companyRegistrationNo : '',
      streetAddressLineOne: customerValue.streetAddressLineOne ? customerValue.streetAddressLineOne : '',
      streetAddressLineTwo: customerValue.streetAddressLineTwo ? customerValue.streetAddressLineTwo : '',
      ppNo: customerValue.ppNo ? customerValue.ppNo : '',
      country: customerValue.country ? customerValue.country : '',
      city: customerValue.city ? customerValue.city : '',
      zipCode: customerValue.zipCode ? customerValue.zipCode : '',
      taxNumber: customerValue.taxNumber ? customerValue.taxNumber : '',
      vatNumber: customerValue.vatNumber ? customerValue.vatNumber : '',
      handlingCompany: customerValue.handlingCompany ? customerValue.handlingCompany : '', //dropdown values
      handlingCustomer: customerValue.handlingCustomer ? customerValue.handlingCustomer : '', //dropdown values
      // contactPerson: customerValue[0].contactPerson ? customerValue[0].contactPerson : '',
      // contactNo: customerValue[0].contactNo ? customerValue[0].contactNo : '',

      /*no need to patch for contactNo and contact person*/
    });
  }

  getCustomer() {
    this.customerservice.getCustomerDetails(this.individualCorpCustomerForm.value.handlingCompany).subscribe(
      respond => {
        this.customers = respond.data;
        this.customers.forEach(i => {
          this.allcustomers.push({id: i.id, name: i.firstName ? i.firstName : i.companyName});
        });
        this.showCustomers = this.allcustomers;
        this.customerType = this.customers[0].type;
        this.patchToCustomer(this.customers[0]);
      }, error => {

      });
  }

  createInquery() {
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

  resetFormControls() {
      this.individualCorpCustomerForm.patchValue({
        id: null,
        firstName: null,
        lastName: null,
        nicNumber: null,
        email: '',
        telNo: '',
        type: this.customerTypeArray[0].id,
        contactPerson: '',
        contactNo: '',
        companyName: '',
        companyRegistrationNo: '',
        streetAddressLineOne: '',
        streetAddressLineTwo: '',
        ppNo: '',
        country: '',
        city: '',
        zipCode: '',
        taxNumber: '',
        vatNumber: '',
        handlingCompany: this.companyTypeArray[0].id,
        handlingCustomer: '',
        inqueryType: InqueryType.Quotation,
        customerStatus: 'new'
      });
  }

  get id() {
    return this.individualCorpCustomerForm.get('id');
  }

  get firstName() {
    return this.individualCorpCustomerForm.get('firstName');
  }

  get lastName() {
    return this.individualCorpCustomerForm.get('lastName');
  }

  get nicNumber() {
    return this.individualCorpCustomerForm.get('nicNumber');
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
