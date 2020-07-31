import { Component, OnInit } from '@angular/core';
import {CompanyType, TextBoxTypes} from '../../../../../shared/services/common/enum';
import {CustomerDetailsService} from '../../../../../shared/services/customer-details.service';
import {CompanyCustomerDeails} from './CompanyCustomerDeails';
import {CustomerType} from '../../../../../shared/services/common/enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-handling',
  templateUrl: './customer-handling.component.html',
  styleUrls: ['./customer-handling.component.scss']
})
export class CustomerHandlingComponent implements OnInit {

  constructor(
    private customerService: CustomerDetailsService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.selectedValue = 'exist';
    console.log(this.selectedValue);
  }


  handleCustomer: CompanyCustomerDeails[];

  new: string;
  exist: string;
  selectedValue: string;
  formEnqble: boolean = true;
  employeeType = [];
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  userType;

  employee = [
    {id: '1', name: 'thilini', company: 'Ingenii'},
    {id: '2', name: 'sanduni', company: 'Ingenii'},
    {id: '3', name: 'Chamari', company: 'Dimo'},
    {id: '4', name: 'Nayana', company: 'Dimo'},
    {id: '5', name: 'Amara', company: 'Ingenii'},
    {id: '6', name: 'Kasuni', company: 'Dimo'},
    {id: '7', name: 'Malithi', company: 'Dimo'},
    {id: '8', name: 'Amara', company: 'ingenii'},
  ];

  company = [
    {id: CompanyType.Ingenii, name: 'Ingenii'},
    {id: CompanyType.Dimo, name: 'Dimo'}
  ];
  comp = this.company;
  handlingCompany;


//get value from radio buttons
  getValue(value) {
    console.log(value);
    if (value === 'new') {
      this.formEnqble = false;
      console.log(this.formEnqble);
    } else {
      this.formEnqble = true;
      console.log(this.formEnqble);
    }
  }

  //get customer id
  getCostomerId(event) {
    this.filterCustomerDetails(event.id);
  }

  //get company id and call to the service class
  getCompany(event) {
    try {
      this.employeeType = this.customerService.getCustomerDetails(event.id)

    } catch (e) {
      console.log(e);
    }
    console.log(event.name, event.id);

  }

  //filter customer
  filterCustomerDetails(id) {
    const data = this.employeeType.filter(employeeType => employeeType.id === id);
    console.log(data[0].name);
  }
}
