import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {FormValidationHelpers} from '../../../../../shared/helpers/form-validation-helpers';
import {CustomerDetailsService} from '../../../../../shared/services/customer-details.service';
import {CompanyCustomerDeails} from './CompanyCustomerDeails';
import {
  CompanyType,
  CustomerType,
  InqueryType,
  TextBoxTypes,
} from '../../../../../shared/services/common/enum';
import {ToastrService} from 'ngx-toastr';

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
  @Output() submitClicked = new EventEmitter();

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
  selectedHandlingCompany: any;
  hidedrop: boolean;
  showDropFilter = true;
  dataLoading = false;

  constructor(
    private customerservice: CustomerDetailsService,
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private toastservice: ToastrService
  ) {
    this.companyCustomerDetails = new CompanyCustomerDeails();
    this.InqueryTypeArray = [
      {id: InqueryType.Quotation, name: 'Quotation'},
      {id: InqueryType.Details, name: 'Details'},
      {
        id: InqueryType.Quotation_with_details,
        name: 'Quotation with Details',
      },
    ];

    this.companyTypeArray = [
      {id: CompanyType.Ingenii, name: 'Ingenii'},
      {id: CompanyType.Dimo, name: 'Dimo'},
    ];

    this.customerTypeArray = [
      {id: CustomerType.Individual, name: 'Individual'},
      {id: CustomerType.Corporate, name: 'Corporate'},
    ];
  }

  customers = []; /*array of customers to get respond*/
  allcustomers = [];
  showCustomers = [];

  ngOnInit(): void {
    this.individualCorpCustomerForm = this.formbuilder.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nicNumber: ['', Validators.required],
      email: ['', [Validators.required]],
      telNo: ['', [Validators.required]],
      type: ['', [Validators.required]],
      contactPerson: ['', Validators.required],
      contactPersonNumber: ['', [Validators.required]],
      companyName: ['', Validators.required],
      companyRegistrationNo: ['', Validators.required],
      streetAddressLineOne: ['', [Validators.required]],
      streetAddressLineTwo: [''],
      ppNo: ['', Validators.required],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      taxNumber: ['', Validators.required],
      vatNumber: ['', Validators.required],
      handlingCompany: [
        this.companyTypeArray[0].id,
        [Validators.required],
      ] /*value by dropdown*/,
      handlingCustomer: [''] /*customer value by dropdown*/,
      inquiryType: [InqueryType.Quotation, [Validators.required]],
      customerStatus: ['exist'],
      description: [''],
    });
    console.log(this.individualCorpCustomerForm.value.handlingCompany);
    console.log(this.individualCorpCustomerForm.value.customerStatus);
    this.getCustomer(); // send the handlingcompany
  }

  getCustomerStuatus(status) {
    if (status.value === 'new') {
      // switch from exists to new
      this.customerTypeArray = [
        {id: 1, name: 'Individual'},
        {id: 2, name: 'Corporate'},
      ];
      console.log(status.value);
      console.log(this.customerType);
      this.customerType = CustomerType.Individual;
      this.individualFormChangesOnload(this.customerType);
      this.individualCorpCustomerForm.reset();
      this.hidedrop = false;
      this.individualCorpCustomerForm.patchValue({
        type: this.customerType,
        handlingCompany: this.selectedHandlingCompany, // this is given a array;
        inquiryType: InqueryType.Quotation,
        customerStatus: 'new',
      });
      this.formEnable = false;
    } else {
      this.getCustomer();
      console.log(status.value);
      this.resetcNumbercPerson();  //reset cPerson & cCustomer when select exist
      this.formEnable = true;
      this.hidedrop = true;
      this.customerType = this.customers[0].type; // reset custom type to customers[0]  //this will fire when select new to get the
      this.individualFormChangesOnload(this.customerType);
      this.patchToCustomer(this.customers[0]);
      this.individualCorpCustomerForm.patchValue({
        handlingCompany: this.selectedHandlingCompany,
        customerStatus: 'exist',
      });
      if (this.customerType === CustomerType.Individual) {
        // switch from new to exist
        this.TypeArray = [{id: 1, name: 'Individual'}];
        this.customerTypeArray = this.TypeArray;
      }
      if (this.customerType === CustomerType.Corporate) {
        this.TypeArray = [{id: 2, name: 'Corporate'}];
        this.customerTypeArray = this.TypeArray;
      }
    }
  }

  getCustomerTypeId(event) {
    this.individualCorpCustomerForm.reset();
    if (event.id === CustomerType.Individual) {
      this.customerType = CustomerType.Individual;
      this.individualFormChangesOnload(this.customerType);
      this.individualCorpCustomerForm.patchValue({
        type: this.customerType,
        handlingCompany: this.selectedHandlingCompany,
        inquiryType: InqueryType.Quotation,
        customerStatus: 'new'
      });
      console.log(this.individualCorpCustomerForm.value.type);
    }
    if (event.id === CustomerType.Corporate) {
      this.customerType = CustomerType.Corporate;
      this.individualFormChangesOnload(this.customerType);
      console.log(this.individualCorpCustomerForm.controls);
      this.individualCorpCustomerForm.patchValue({
        type: this.customerType,
        handlingCompany: this.selectedHandlingCompany,
        inquiryType: InqueryType.Quotation,
        customerStatus: 'new'
      });
      console.log(this.customerType);
    }
  }

  getCustomerId(event) {
    // dropdown event when select customer
    if (event) {
      if (this.individualCorpCustomerForm.value.customerStatus === 'exist') {
        this.companyCustomerDetails.id = event.id;
        this.filterCustomerDetails(this.companyCustomerDetails.id);
      }
    }
  }

  getCompanySelected(event) {
    this.selectedHandlingCompany = event.id;
    if (this.individualCorpCustomerForm.value.customerStatus === 'exist') {
      // patch or not
      this.individualCorpCustomerForm.patchValue({
        // when event fired need to find the relevant id customer from the array
        handlingCompany: this.selectedHandlingCompany,
      });
      this.allcustomers = [];
      this.getCustomer();
      console.log(this.individualCorpCustomerForm.value.handlingCompany);
      this.resetcNumbercPerson();
    } else {
      console.log(this.individualCorpCustomerForm.value.customerStatus);
      this.individualCorpCustomerForm.patchValue({
        // to select new customer company
        handlingCompany: this.selectedHandlingCompany,
      });
      this.allcustomers = []; // empty the array to get the triggered company customers
      // this.getCustomer();
    }
  }

  filterCustomerDetails(id) {
    this.customerData = this.customers.filter((c) => c.id === id);
    console.log(this.customerData[0].type);
    this.resetcNumbercPerson();                 //reset number & person when customer change
    this.individualFormChangesOnload(this.customerData[0].type);
    this.customerType = this.customerData[0].type; // display
    if (this.customerData[0].type === CustomerType.Corporate) {
      this.customerTypeArray = [{id: 2, name: 'Corporate'}];
      console.log(this.individualCorpCustomerForm.controls);
      this.patchToCustomer(this.customerData[0]);
    }
    if (this.customerData[0].type === CustomerType.Individual) {
      this.patchToCustomer(this.customerData[0]); // call for patch the individual customer
      console.log(this.individualCorpCustomerForm.controls);
      this.customerTypeArray = [{id: 1, name: 'Individual'}];
    }
  }

  patchToCustomer(customerValue) {
    console.log(customerValue);
    this.selectedHandlingCompany = customerValue.handlingCompany;
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
        : '',
      handlingCustomer: customerValue.handlingCustomer
        ? customerValue.handlingCustomer
        : '',
      description: customerValue.description ? customerValue.description : '',
    });
  }

  getCustomer() {
    this.dataLoading = true;
    console.log(this.allcustomers);
    try {
      this.customerservice
        .getCustomerDetails(
          this.individualCorpCustomerForm.value.handlingCompany
        )
        .subscribe((respond) => {
          this.customers = respond.data;
          this.customers.forEach((i) => {
            this.allcustomers.push({
              id: i.id,
              name: i.firstName ? i.firstName : i.companyName,
            });
          });
          this.showCustomers = this.allcustomers;
          if (this.individualCorpCustomerForm.value.customerStatus === 'exist') {
            this.hidedrop = true;
            // if user exists then patch, otherwise do not patch if respond reached
            this.customerType = this.customers[0].type;
            this.dataLoading = false;
            if (this.customerType === CustomerType.Individual) {
              // page loading select dropdown value
              this.TypeArray = [{id: 1, name: 'Individual'}];
              this.customerTypeArray = this.TypeArray;
            }
            if (this.customerType === CustomerType.Corporate) {
              this.TypeArray = [{id: 2, name: 'Corporate'}];
              this.customerTypeArray = this.TypeArray;
            }
            // this.individualFormChanges();
            this.individualFormChangesOnload(this.customers[0].type);
            this.patchToCustomer(this.customers[0]);
            console.log(this.individualCorpCustomerForm.controls);
          } else {
            this.hidedrop = false;
            this.dataLoading = false;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  createInquery() {
    try {
      if(this.individualCorpCustomerForm.value.customerStatus === 'exist'){
        if (this.individualCorpCustomerForm.value.type === CustomerType.Individual) {
          console.log(this.individualCorpCustomerForm.value);
          if (this.individualCorpCustomerForm.invalid) {
            this.formvalidationhelpers.validateAllFormFields(
              this.individualCorpCustomerForm
            );
            return;
          }
          {
            this.selectedHandlingCompany = this.individualCorpCustomerForm.value.handlingCompany;
            this.customerservice
              .addInquery(this.individualCorpCustomerForm.value)
              .subscribe((respond) => {
                this.individualCorpCustomerForm.reset();
                this.individualCorpCustomerForm.patchValue({
                  handlingCompany: this.selectedHandlingCompany,
                  customerStatus: 'exist',
                  inquiryType: InqueryType.Quotation
                });
                this.resetcNumbercPerson();
                this.getCustomer();
                this.formEnable = true;
                console.log(respond);
                this.showSuccess();
              });
          }
        } else if (this.individualCorpCustomerForm.value.type === CustomerType.Corporate) {
          console.log(this.individualCorpCustomerForm.value);
          if (this.individualCorpCustomerForm.invalid) {
            this.formvalidationhelpers.validateAllFormFields(
              this.individualCorpCustomerForm
            );
            return;
          }
          {
            this.customerservice
              .addInquery(this.individualCorpCustomerForm.value)
              .subscribe((respond) => {
                this.individualCorpCustomerForm.reset();
                this.individualCorpCustomerForm.patchValue({
                  handlingCompany: this.selectedHandlingCompany,
                  customerStatus: 'exist',
                  inquiryType: InqueryType.Quotation
                });
                this.resetcNumbercPerson();
                this.getCustomer();
                this.formEnable = true;
                console.log(respond);
                this.showSuccess();
              });
          }
        }

      } else if(this.individualCorpCustomerForm.value.customerStatus === 'new'){
        if (this.individualCorpCustomerForm.value.type === CustomerType.Individual) {
          console.log(this.individualCorpCustomerForm.value);
          if (this.individualCorpCustomerForm.invalid) {
            this.formvalidationhelpers.validateAllFormFields(
              this.individualCorpCustomerForm
            );
            return;
          }
          {
            this.selectedHandlingCompany = this.individualCorpCustomerForm.value.handlingCompany;
            this.customerservice
              .addInquery(this.individualCorpCustomerForm.value)
              .subscribe((respond) => {
                this.individualCorpCustomerForm.reset();
                this.individualCorpCustomerForm.patchValue({
                  handlingCompany: this.selectedHandlingCompany,
                  customerStatus: 'new',
                  inquiryType: InqueryType.Quotation
                });
                this.resetcNumbercPerson();
                this.getCustomer();
                this.formEnable = false;
                console.log(respond);
                this.showSuccess();
              });
          }
        } else if (this.individualCorpCustomerForm.value.type === CustomerType.Corporate) {
          console.log(this.individualCorpCustomerForm.value);
          if (this.individualCorpCustomerForm.invalid) {
            this.formvalidationhelpers.validateAllFormFields(
              this.individualCorpCustomerForm
            );
            return;
          }
          {
            this.customerservice
              .addInquery(this.individualCorpCustomerForm.value)
              .subscribe((respond) => {
                this.individualCorpCustomerForm.reset();
                this.individualCorpCustomerForm.patchValue({
                  handlingCompany: this.selectedHandlingCompany,
                  customerStatus: 'new',
                  inquiryType: InqueryType.Quotation
                });
                this.resetcNumbercPerson();
                this.getCustomer();
                this.formEnable = false;
                console.log(respond);
                this.showSuccess();
              });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  showSuccess() {
    this.toastservice.success('Success', 'Inquery Created Succesfully');
  }

  individualFormChangesOnload(type) {
    if (type === CustomerType.Individual) {
      if (this.individualCorpCustomerForm.get('firstName') === null) {
        this.individualCorpCustomerForm.addControl(
          'firstName',
          new FormControl('')
        );
        const fname = this.individualCorpCustomerForm.get('firstName');
        fname.setValidators(Validators.required);
      }
      if (this.individualCorpCustomerForm.get('lastName') === null) {
        this.individualCorpCustomerForm.addControl(
          'lastName',
          new FormControl('')
        );
        const lName = this.individualCorpCustomerForm.get('lastName');
        lName.setValidators(Validators.required);
      }
      if (this.individualCorpCustomerForm.get('nicNumber') === null) {
        this.individualCorpCustomerForm.addControl(
          'nicNumber',
          new FormControl('')
        );
        const nicNumber = this.individualCorpCustomerForm.get('nicNumber');
        nicNumber.setValidators(Validators.required);
      }
      if (this.individualCorpCustomerForm.get('ppNo') === null) {
        this.individualCorpCustomerForm.addControl('ppNo', new FormControl(''));
        const ppNo = this.individualCorpCustomerForm.get('ppNo');
        ppNo.setValidators(Validators.required);
      }


      if (this.individualCorpCustomerForm.get('telNo') === null) {
        this.individualCorpCustomerForm.addControl('telNo', new FormControl(''));
        const telNo = this.individualCorpCustomerForm.get('telNo');
        telNo.setValidators(Validators.required);
      }


      if (this.individualCorpCustomerForm.get('companyName')) {
        this.individualCorpCustomerForm.removeControl('companyName');
      }
      if (this.individualCorpCustomerForm.get('companyRegistrationNo')) {
        this.individualCorpCustomerForm.removeControl('companyRegistrationNo');
      }
      if (this.individualCorpCustomerForm.get('taxNumber')) {
        this.individualCorpCustomerForm.removeControl('taxNumber');
      }
      if (this.individualCorpCustomerForm.get('vatNumber')) {
        this.individualCorpCustomerForm.removeControl('vatNumber');
      }
    } else if (type === CustomerType.Corporate) {
      if (this.individualCorpCustomerForm.get('companyName') === null) {
        this.individualCorpCustomerForm.addControl(
          'companyName',
          new FormControl('')
        );
        const companyName = this.individualCorpCustomerForm.get('companyName');
        companyName.setValidators(Validators.required);
      }
      if (this.individualCorpCustomerForm.get('companyRegistrationNo') === null) {
        this.individualCorpCustomerForm.addControl(
          'companyRegistrationNo',
          new FormControl('')
        );
        const companyRegistrationNo = this.individualCorpCustomerForm.get('companyRegistrationNo');
        companyRegistrationNo.setValidators(Validators.required);
      }
      if (this.individualCorpCustomerForm.get('taxNumber') === null) {
        this.individualCorpCustomerForm.addControl(
          'taxNumber',
          new FormControl('')
        );
        const taxNumber = this.individualCorpCustomerForm.get('taxNumber');
        taxNumber.setValidators(Validators.required);
      }
      if (this.individualCorpCustomerForm.get('vatNumber') === null) {
        this.individualCorpCustomerForm.addControl(
          'vatNumber',
          new FormControl('')
        );
        const vatNumber = this.individualCorpCustomerForm.get('vatNumber');
        vatNumber.setValidators(Validators.required);
      }

      if (this.individualCorpCustomerForm.get('firstName')) {
        this.individualCorpCustomerForm.removeControl('firstName');
      }
      if (this.individualCorpCustomerForm.get('lastName')) {
        this.individualCorpCustomerForm.removeControl('lastName');
      }
      if (this.individualCorpCustomerForm.get('nicNumber')) {
        this.individualCorpCustomerForm.removeControl('nicNumber');
      }
      if (this.individualCorpCustomerForm.get('ppNo')) {
        this.individualCorpCustomerForm.removeControl('ppNo');
      }
      if (this.individualCorpCustomerForm.get('telNo')) {
        this.individualCorpCustomerForm.removeControl('telNo');
      }
    }
  }

  resetcNumbercPerson() {
    const contactPerson = this.individualCorpCustomerForm.get('contactPerson');
    contactPerson.reset();
    const contactNumber = this.individualCorpCustomerForm.get('contactPersonNumber');
    contactNumber.reset();
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

  get contactPersonNumber() {
    return this.individualCorpCustomerForm.get('contactPersonNumber');
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

  get description() {
    return this.individualCorpCustomerForm.get('description');
  }
}
