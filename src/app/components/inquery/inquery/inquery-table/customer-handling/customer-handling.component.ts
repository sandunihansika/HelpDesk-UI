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
  }


  customers = []; /*array of customers to get respond*/
  allcustomers = [];
  showCustomers = [];


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
      handlingCustomer: [null, [Validators.required]], /*value by dropdown*/
      inqueryType: ['', [Validators.required]],
      customerStatus: ['exist']
    });
    console.log(this.individualCorpCustomerForm.value.customerStatus);
    this.getCustomer(); //send the handlingcompany
  }


  getCustomerStuatus(status, form: FormGroupDirective) { //radio event to select customer status
    if (status.value === 'new') {
      // form.resetForm();
      this.individualCorpCustomerForm.reset();
      this.customerType = CustomerType.Individual;
      this.displayCop = true;
      this.formEnable = false;
      // console.log(this.formEnable);
    } else {
      this.displayCop = false;
      this.formEnable = true;
      this.patchToCustomer(this.customers[0]);

      // console.log(this.formEnable);
    }
  }

  getCustomerId(event) { //dropdown event when select customer
    this.companyCustomerDetails.id = event.id;
    this.filterCustomerDetails(this.companyCustomerDetails.id);

  }

  getCompanySelected(event) { //dropdown event
    this.individualCorpCustomerForm.value.handlingCompany = event.id;  //when event fired need to find the relevant id customer form the array
    this.allcustomers = [''];
    this.getCustomer();
    console.log(this.individualCorpCustomerForm.value.handlingCompany);
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
      firstName: customerValue.firstName ? customerValue.firstName : '',
      lastName: customerValue.lastName ? customerValue.lastName : '',
      nic: customerValue.nic ? customerValue.nic : '',
      email: customerValue.email ? customerValue.email : '',
      telNo: customerValue.telNo ? customerValue.telNo : '',
      address: customerValue.address ? customerValue.address : '',
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
          this.allcustomers.push({id: i.id, name: i.firstName ? i.firstName : ''});
        });
        this.showCustomers = this.allcustomers;
        // console.log(this.customers[0]);
        //when page load first array element get
        this.patchToCustomer(this.customers[0]); // call to patch the first customer
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

  udpateInquery(id) {
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
