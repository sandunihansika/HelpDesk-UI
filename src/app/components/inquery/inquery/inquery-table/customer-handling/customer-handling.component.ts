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
  formEnqble: boolean = false;


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

  emp = this.employee;

  user :{
    id : string;
    name :string;
    company : string

  }

  getValue(value) {
    console.log(value);
    if (value === 'new') {
      this.formEnqble = true;
      console.log(this.formEnqble);
    } else {
      this.formEnqble = false;
      console.log(this.formEnqble);
    }
  }

  getCostomerId(event) {
    this.filterCustomerDetails(event.id);
    console.log(event.id);

  }

  i=0;

  filterCustomerDetails(id){
    console.log(id);
    for(this.i;this.i<=this.employee.length;this.i++){
      if("this.employee.id"===id){
        this.user = this.employee[this.i];
        console.log(this.user);
      }
    }
  }





}
