import { Component } from "@angular/core";
import {
  CompanyType,
  ComplaintType,
  TextBoxTypes,
} from "../../../shared/services/common/enum";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormValidationHelpers } from "../../../shared/helpers/form-validation-helpers";
import { CustomerDetailsService } from "../../../shared/services/customer-details.service";
import { CompanyCustomerDeails } from "../../inquery/inquery/inquery-table/customer-handling/CompanyCustomerDeails";
import { ComplaintDetails } from "./ComplaintDetails";

@Component({
  selector: "app-complaint-form",
  templateUrl: "./complaint-form.component.html",
  styleUrls: ["./complaint-form.component.scss"],
})
export class ComplaintFormComponent {
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  complainTypeId = [];
  complaintForm: FormGroup;
  showCustomers = [];
  allCustomers = [];
  customers = [];
  companyCustomerDetails: CompanyCustomerDeails;
  complaintDetails: ComplaintDetails;
  customerData: any[];

  constructor(
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private customerservice: CustomerDetailsService
  ) {
    this.complainTypeId = [
      { id: ComplaintType.SimProblem, name: "Sim Problem" },
      { id: ComplaintType.DevicePromblem, name: "Device Problem" },
    ];
    this.companyCustomerDetails = new CompanyCustomerDeails();
  }

  ngOnInit(): void {
    this.complaintForm = this.formbuilder.group({
      customerId: ["", [Validators.required]],
      complainTypeId: [this.complainTypeId[0].id, [Validators.required]],
      handlingCustomer: [null, [Validators.required]],
      handlingCompany: ["", [Validators.required]],
      contactPerson: ["", [Validators.required]],
      contactPersonNumber: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
    this.getCustomers();
  }

  addComplaint() {
    console.log("working");
    console.log(this.complaintForm.value);
    this.customerservice
      .addComplaint(this.complaintForm.value)
      .subscribe((res) => {
        console.log("Submitted successfully.......!!!!");
      });
  }

  getComplaintSelected(event) {
    this.complaintForm.value.complainTypeId = event.id;
  }

  getCustomers() {
    console.log("working");
    this.customerservice.getCustomerList().subscribe((respond) => {
      this.customers = respond.data;
      this.customers.forEach((i) => {
        this.allCustomers.push({
          id: i.id,
          name: i.firstName ? i.firstName : i.companyName,
        });
      });
      this.showCustomers = this.allCustomers;
      // console.log(this.customers[0]);
      //when page load first array element get
      this.patchToCustomer(this.customers[0]);
    });
  }

  patchToCustomer(customerValue) {
    console.log(customerValue);
    this.complaintForm.patchValue({
      customerId: customerValue.id ? customerValue.id : "",
      handlingCompany: customerValue.handlingCompany
        ? this.getHandlingCompanyName(customerValue.handlingCompany)
        : "",
    });
  }

  getHandlingCompanyName(item: number) {
    if (item === CompanyType.Dimo) {
      return "Dimo";
    } else if (item === CompanyType.Ingenii) {
      return "Ingenii";
    }
  }

  getCustomerId(event) {
    //dropdown event when select customer
    console.log("Coming");
    this.companyCustomerDetails.id = event.id;
    this.filterCustomerDetails(this.companyCustomerDetails.id);
  }

  filterCustomerDetails(id) {
    this.customerData = this.customers.filter((c) => c.id === id);
    this.patchToCustomer(this.customerData[0]);
  }

  saveDetails() {}
}
