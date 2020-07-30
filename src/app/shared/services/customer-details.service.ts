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

  getCustomerDetails(handlingCompany: any):Observable<any> {
    return this.commonHttpService.postData(this.customerUrl + '/view',handlingCompany).pipe(  // http://localhost:5000/admin/customer
      map(data => {
        console.log(data);
        return data;
      })
    );
  }


//get customer details according to the company


}
