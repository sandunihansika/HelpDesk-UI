import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CustomerDetails} from '../../components/inquery/inquery/customer-details/customer-details/customer-details';
import {Router} from '@angular/router';
import {AuthenticationService} from './auth/authentication.service';
import {CommonHttpService} from './common/common-http.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  customerUrl = 'customer';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private commonHttpService: CommonHttpService
  ) {
  }

  addCustomer(customer: CustomerDetails, NIC): Observable<any> {
    customer.NIC = NIC;
    return this.commonHttpService.postData(this.customerUrl + '/add', customer).pipe(  // http://localhost:5000/admin/customer/add//
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
}
