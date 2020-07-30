import { Component, OnInit } from '@angular/core';
import {CompanyType} from '../../../../../shared/services/common/enum';
import {CustomerDetailsService} from '../../../../../shared/services/customer-details.service';
import {CompanyCustomerDeails} from './CompanyCustomerDeails';
import {CustomerType} from '../../../../../shared/services/common/enum';

@Component({
  selector: 'app-customer-handling',
  templateUrl: './customer-handling.component.html',
  styleUrls: ['./customer-handling.component.scss']
})
export class CustomerHandlingComponent implements OnInit {

  constructor(
  private customerService : CustomerDetailsService
  ) { }

  ngOnInit(): void {
    this.selectedValue = 'exist';
    console.log(this.selectedValue);
  }

handleCustomer : CompanyCustomerDeails[];

  new: string;
  exist: string;
  selectedValue: string;
  formEnqble: boolean = true;


  employee= [
    { id: '1', name: 'thilini',company : 'Ingenii'},
    { id: '2', name: 'sanduni' ,company : 'Ingenii'},
    { id : '3',name : 'Chamari',company : 'Dimo'},
    { id : '4',name : 'Nayana',company : 'Dimo'},
    { id : '5',name : 'Amara',company : 'Ingenii'},
    { id : '6',name : 'Kasuni',company : 'Dimo'},
    { id : '7',name : 'Malithi',company : 'Dimo'},
    { id : '8',name : 'Amara',company : 'ingenii'},
  ];

  company=[
    { id : CompanyType.Ingenii, name : 'Ingenii'},
    { id : CompanyType.Dimo, name : 'Dimo'}
  ];
  comp = this.company;

  emp = this.employee;

  user :{
    id : string;
    name :string;
    company : string
  }

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

  getCostomerId(event) {
    this.filterCustomerDetails(event.id);
  }

  getCompany(event){
    try{
      this.customerService.getCustomerDetails(event.id).
      subscribe(response=>{
        if(response.type == CustomerType.Individual) {
          this.handleCustomer = response;
        }if(response.type == CustomerType.Corporate){
           this.handleCustomer = response
        }

      })
    }
    catch (e) {
      console.log(e);
    }
    console.log(event.name,event.id);

  }

  filterCustomerDetails(id){
    const result = this.employee.filter(employee => employee.id === id);
    console.log(result[0].name);
  }


}
