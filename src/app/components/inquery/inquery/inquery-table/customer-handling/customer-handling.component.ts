import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-handling',
  templateUrl: './customer-handling.component.html',
  styleUrls: ['./customer-handling.component.scss']
})
export class CustomerHandlingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.selectedValue = 'exist';
    console.log(this.selectedValue);
  }


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
    { id : '1',name : 'Ingenii'},
    { id : '2',name : 'Dimo'}
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
    console.log(event.name);

  }

  filterCustomerDetails(id){
    const result = this.employee.filter(employee => employee.id === id);
    console.log(result);
  }


}
