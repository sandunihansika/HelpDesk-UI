import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationHelpers } from '../../../../../shared/helpers/form-validation-helpers';
import { CustomerDetailsService } from '../../../../../shared/services/customer-details.service';
import { CompanyCustomerDeails } from './CompanyCustomerDeails';
import {
  CompanyType,
  CustomerType,
  InqueryType,
  TextBoxTypes,
} from '../../../../../shared/services/common/enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-handling',
  templateUrl: './customer-handling.component.html',
  styleUrls: ['./customer-handling.component.scss'],
})
export class CustomerHandlingComponent implements OnInit {
  individualCorpCustomerForm: FormGroup;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  companyCustomerDetails: CompanyCustomerDeails;
  customerData: any[];

  new: string;
  exist: string;
  selectedValue: string;
  formEnable = true;
  display: boolean;
  displayCop: boolean;
  displayTypedrop: boolean;
  cTypes: typeof CustomerType = CustomerType;
  customerType: CustomerType;
  InqueryTypeArray = [];
  companyTypeArray = [];
  customerTypeArray = [];
  TypeArray = [];

  constructor(
    private customerservice: CustomerDetailsService,
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private toastservice: ToastrService
  ) {
    this.companyCustomerDetails = new CompanyCustomerDeails();
    this.InqueryTypeArray = [
      { id: InqueryType.Quotation, name: 'Quotation' },
      { id: InqueryType.Details, name: 'Details' },
      {
        id: InqueryType.Quotation_with_details,
        name: 'Quotation with Details',
      },
    ];

    this.companyTypeArray = [
      { id: CompanyType.Ingenii, name: 'Ingenii' },
      { id: CompanyType.Dimo, name: 'Dimo' },
    ];

    this.customerTypeArray = [
      { id: CustomerType.Individual, name: 'Individual' },
      { id: CustomerType.Corporate, name: 'Corporate' },
    ];
  }

  customers = []; /*array of customers to get respond*/
  allcustomers = [];
  showCustomers = [];

  ngOnInit(): void {
    this.individualCorpCustomerForm = this.formbuilder.group({
      id: [null],
      firstName: [''],
      lastName: [''],
      nicNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      telNo: ['', [Validators.required, Validators.minLength(10)]],
      type: ['', [Validators.required]],
      contactPerson: [''],
      contactNo: ['', [Validators.minLength(10)]],
      companyName: [''],
      companyRegistrationNo: [''],
      streetAddressLineOne: ['', [Validators.required]],
      streetAddressLineTwo: ['', [Validators.required]],
      ppNo: '',
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      taxNumber: [''],
      vatNumber: [''],
      handlingCompany: [
        this.companyTypeArray[0].id,
        [Validators.required],
      ] /*value by dropdown*/,
      handlingCustomer: [''] /*customer value by dropdown*/,
      inquiryType: [InqueryType.Quotation, [Validators.required]],
      customerStatus: ['exist'],
    });
    console.log(this.individualCorpCustomerForm.value.handlingCompany);
    console.log(this.individualCorpCustomerForm.value.customerStatus);
    this.getCustomer(); // send the handlingcompany
  }

  getCustomerStuatus(status) {
    // radio event to select customer status
    this.customerType = CustomerType.Individual;
    if (status.value === 'new') {
      // switch from exists to new
      this.customerTypeArray = [
        { id: 1, name: 'Individual' },
        { id: 2, name: 'Corporate' },
      ];
      console.log(status.value);
      console.log(this.customerType);
      this.individualCorpCustomerForm.value.customerStatus = status.value;
      // this.individualCorpCustomerForm.value.handlingCompany = this.companyTypeArray[0].id; //new handling company fixed, dont change this
      this.resetForm(CustomerType.Individual); // new Form need this get the selected company first customer type
      this.formEnable = false;
    } else {
      console.log(status.value);
      this.formEnable = true;
      this.customerType = this.customers[0].type; // reset custom type to customers[0]  //this will fire when select new to get the
      this.patchToCustomer(this.customers[0]);
      if (this.customerType == CustomerType.Individual) {
        // switch from new to exist
        this.TypeArray = [{ id: 1, name: 'Individual' }];
        this.customerTypeArray = this.TypeArray;
      }
      if (this.customerType == CustomerType.Corporate) {
        this.TypeArray = [{ id: 2, name: 'Corporate' }];
        this.customerTypeArray = this.TypeArray;
      }
    }
  }

  getCustomerTypeId(event) {
    if (event.id === CustomerType.Individual) {
      this.customerType = CustomerType.Individual;
      // this.individualCorpCustomerForm.value.type = event.id;
      this.resetForm(this.customerType); // reset the entered values and set the type
      console.log(this.individualCorpCustomerForm.value.type);
    }
    if (event.id === CustomerType.Corporate) {
      this.customerType = CustomerType.Corporate;
      this.resetForm(this.customerType); // reset the entered values and set the type
      // this.individualCorpCustomerForm.value.type = event.id;
      // this.individualCorpCustomerForm.value.type = CustomerType.Corporate;
      console.log(this.customerType);
    }
  }

  getCustomerId(event) {
    // dropdown event when select customer
    this.companyCustomerDetails.id = event.id;
    this.filterCustomerDetails(this.companyCustomerDetails.id);
  }

  getCompanySelected(event) {
    if (this.individualCorpCustomerForm.value.customerStatus == 'exist') {
      // patch or not
      this.individualCorpCustomerForm.value.handlingCompany = event.id; // when event fired need to find the relevant id customer from the array
      this.allcustomers = [];
      this.getCustomer();
      console.log(this.individualCorpCustomerForm.value.handlingCompany);
    } else {
      this.individualCorpCustomerForm.value.handlingCompany = event.id; // to select new customer company
      this.allcustomers = []; // empty the array to get the triggered company customers
      this.getCustomer();
    }
  }

  filterCustomerDetails(id) {
    this.customerData = this.customers.filter((c) => c.id === id);
    console.log(this.customerData[0].type);
    this.customerType = this.customerData[0].type; // display
    if (this.customerData[0].type == CustomerType.Corporate) {
      this.customerTypeArray = [{ id: 2, name: 'Corporate' }];
      this.patchToCustomer(this.customerData[0]);
    }
    if (this.customerData[0].type == CustomerType.Individual) {
      this.patchToCustomer(this.customerData[0]); // call for patch the individual customer
      this.customerTypeArray = [{ id: 1, name: 'Individual' }];
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
      type: customerValue.type ? customerValue.type : '', // need to patch for exists
      companyName: customerValue.companyName ? customerValue.companyName : '',
      companyRegistrationNo: customerValue.companyRegistrationNo
        ? customerValue.companyRegistrationNo
        : '',
      streetAddressLineOne: customerValue.streetAddressLineOne
        ? customerValue.streetAddressLineOne
        : '',
      streetAddressLineTwo: customerValue.streetAddressLineTwo
        ? customerValue.streetAddressLineTwo
        : '',
      ppNo: customerValue.ppNo ? customerValue.ppNo : '',
      country: customerValue.country ? customerValue.country : '',
      city: customerValue.city ? customerValue.city : '',
      zipCode: customerValue.zipCode ? customerValue.zipCode : '',
      taxNumber: customerValue.taxNumber ? customerValue.taxNumber : '',
      vatNumber: customerValue.vatNumber ? customerValue.vatNumber : '',
      handlingCompany: customerValue.handlingCompany
        ? customerValue.handlingCompany
        : '', // dropdown values
      handlingCustomer: customerValue.handlingCustomer
        ? customerValue.handlingCustomer
        : '', // dropdown values
      // contactPerson: customerValue[0].contactPerson ? customerValue[0].contactPerson : '',
      // contactNo: customerValue[0].contactNo ? customerValue[0].contactNo : '',

      /*no need to patch for contactNo and contact person*/
    });
  }

  getCustomer() {
    console.log(this.allcustomers);
    this.customerservice
      .getCustomerDetails(this.individualCorpCustomerForm.value.handlingCompany)
      .subscribe(
        (respond) => {
          this.customers = respond.data;
          this.customers.forEach((i) => {
            this.allcustomers.push({
              id: i.id,
              name: i.firstName ? i.firstName : i.companyName,
            });
          });
          this.showCustomers = this.allcustomers;
          this.customerType = this.customers[0].type;

          if (this.individualCorpCustomerForm.value.customerStatus == 'exist') {
            // if user exists then patch, otherwise do not patch if respond reached
            if (this.customerType == CustomerType.Individual) {
              // page loading select dropdown value
              this.TypeArray = [{ id: 1, name: 'Individual' }];
              this.customerTypeArray = this.TypeArray;
            }
            if (this.customerType == CustomerType.Corporate) {
              this.TypeArray = [{ id: 2, name: 'Corporate' }];
              this.customerTypeArray = this.TypeArray;
            }
            this.patchToCustomer(this.customers[0]);
          }
        },
        (error) => {}
      );
  }

  createInquery() {
    console.log(this.individualCorpCustomerForm.value);
    if (this.individualCorpCustomerForm.invalid) {
      this.formvalidationhelpers.validateAllFormFields(
        this.individualCorpCustomerForm
      );
      return;
    } else if (this.individualCorpCustomerForm.valid) {
      this.customerservice
        .addInquery(this.individualCorpCustomerForm.value)
        .subscribe((respond) => {
          this.showSuccess();
          // this.individualCorpCustomerForm.reset();
          /**/
        });
    }
  }

  showSuccess() {
    this.toastservice.success('Success', 'Inquery Created Succesfully');
  }

  resetForm(data) {
    this.individualCorpCustomerForm.patchValue({
      id: null,
      firstName: '',
      lastName: '',
      nicNumber: '',
      email: '',
      telNo: '',
      type: data,
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
      handlingCompany: this.individualCorpCustomerForm.value.handlingCompany, // this is given a array;
      handlingCustomer: '',
      inquiryType: InqueryType.Quotation,
      customerStatus: 'new',
    });
    console.log(this.individualCorpCustomerForm.value);
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

  get type() {
    return this.individualCorpCustomerForm.get('type');
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

  get inquiryType() {
    return this.individualCorpCustomerForm.get('inqueryType');
  }

  get customerStatus() {
    return this.individualCorpCustomerForm.get('customerStatus');
  }
}
