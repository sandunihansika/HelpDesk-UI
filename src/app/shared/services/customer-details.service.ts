import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CustomerDetails} from '../../components/inquery/inquery/customer-details/customer-details/customer-details';
import {Router} from '@angular/router';
import {AuthenticationService} from './auth/authentication.service';
import {CommonHttpService} from './common/common-http.service';
import {Quatation} from '../../components/inquery/inquery/inquery-table/quatation/quatation/quatation';
import {environment} from '../../../environments/environment';
import {CompanyType} from './common/enum';


@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  customerUrl = 'customer';
  selectedCustomer;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private commonHttpService: CommonHttpService
  ) {
  }

  employee1= [
    { id: '1', name: 'thilini',company : 'Ingenii',type :'Individual'},
    { id: '2', name: 'sanduni' ,company : 'Ingenii',type :'Individual'},
    { id : '3',name : 'Chamari',company : 'Ingenii',type :'Individual'},
    { id : '4',name : 'Nayana',company : 'Ingenii',type :'Individual'},
    { id : '5',name : 'Amara',company : 'Ingenii',type :'Individual'},
    { id : '6',name : 'Kasuni',company : 'Ingenii',type :'Individual'},
    { id : '7',name : 'Malithi',company : 'Ingenii',type :'Individual'},
    { id : '8',name : 'Amara',company : 'Ingenii',type :'Individual'},
  ];

  employee2= [
    { id: '1', name: 'Akila',company : 'Demo',type :'Corporate'},
    { id: '2', name: 'Siripala' ,company : 'Demo',type :'Corporate'},
    { id : '3',name : 'Chamila',company : 'Demo',type :'Corporate'},
    { id : '4',name : 'Herath',company : 'Demo',type :'Corporate'},
    { id : '5',name : 'Kumari',company : 'Demo',type :'Corporate'},
    { id : '6',name : 'Banda',company : 'Demo',type :'Corporate'},
    { id : '7',name : 'manike',company : 'Demo',type :'Corporate'},
    { id : '8',name : 'Bandara',company : 'Demo',type :'Corporate'},
  ];




  addCustomer(customer: CustomerDetails, nic): Observable<any> {
    customer.nic = nic;
    return this.commonHttpService.postData(this.customerUrl + '/add', customer).pipe(  // http://localhost:5000/admin/customer/add//
      map(data => {
        return data;
      })
    );
  }

  addQuatation(quatation: Quatation, customerId): Observable<any> {
    quatation.customerId = customerId;
    return this.commonHttpService.postUploadData(this.customerUrl + '/quatation', quatation).pipe(
      map(data => {
        return data;
      })
    );
  }

  getAllCustomers(): Observable<any> {
    return this.commonHttpService.getAll(this.customerUrl + '/get').pipe(
      map(data => {
        return data;
      })
    );
  }

//get customer details according to the company
  getCustomerDetails(handlingCompany: any) {
try{
  this.http.get('http://localhost:3000/hellow').subscribe(response=>{
    console.log(response);
  })
}catch (e) {
  console.log(e);
}


    if(handlingCompany === CompanyType.Ingenii){
      return this.employee1;
    }
    if(handlingCompany === CompanyType.Dimo){
      return this.employee2;
    }
    // return this.commonHttpService.postData(this.customerUrl + '/view',handlingCompany).pipe(  // http://localhost:5000/admin/customer
    //   map(data => {
    //     console.log(data);
    //     return data;
    //   })
    // );


  }




}
