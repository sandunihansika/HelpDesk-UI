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

//   customerData = [
//     {cid:1, fname:'Dean', lname:'Winchester', type:1},
//     {cid:2, fname:'Sam', lname:'Winchester', type:1},
//     {cid:3, name:'MASS', regno:'111', type:2},
//     {cid:4, name:'Phoenix', regno:'101', type:2}
//   ]
//
//   quotationData = [
//     {id:1, cid:1, qno:'AB-123', expirydate:'07/30/2020'},
//     {id:2, cid:2, qno:'AB-222', expirydate:'08/01/2020'},
//   ]
//
//   inquiry: any;
//
//   inquiryData = [
//     {
//     id: 1,
//     cid: 1,
//     fname: 'Mark',
//     lname: 'George',
//     nic: '957823918V',
//     cperson: 'Micheal',
//     cno: '0719873701',
//     handlingcompany: 'Dimo',
//     status: 'Need Consent'
//   },
// {
//   id: 2,
//   cid: 2,
//   name: 'Unicorn',
//   regno: '13',
//   cperson: 'Fred',
//   cno: '0701231234',
//   handlingcompany: 'Ingenii',
//   status: 'Send Quotation'
// },
// {
//   id: 3,
//     cid: 3,
//   fname: 'Dean',
//   lname: 'Winchester',
//   nic: '979238792V',
//   cperson: 'Sam',
//   cno: '0769182732',
//   handlingcompany: 'Dialog',
//   status: 'Remind Customer'
// },
// {
//   id: 4,
//     cid: 4,
//   name: 'Phoenix',
//   regno: '15',
//   cperson: 'Sam',
//   cno: '0769182732',
//   handlingcompany: 'Dialog',
//   status: 'Other'
// },
// ];

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

  getQuotation(customerId): Observable<any>{
    //return this.quotationData.filter(quotationData => quotationData.cid === customerId);
    return this.http.get( 'http://localhost:3000/quotation/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  getAllInquiry(): Observable<any>{
    //return this.inquiryData;
    return this.http.get('http://localhost:3000/inquiry/inquiryDetails').pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }


  getCustomerDetails(handlingCompany: any) {
    return this.commonHttpService.postData(this.customerUrl + '/view', handlingCompany).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  getCustomerList(): Observable<any>{
    //return this.customerData;
    return this.http.get('http://localhost:3000/customer/getAllCustomers').pipe(
      map(data => {
        return data;
      })
    );
  }

  getAuditDetails(customerId): Observable<any>{
    return this.http.get('http://localhost:3000/audit/auditreport/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedGotConsent(inquiryId, customerId): Observable<any> {
    // return this.commonHttpService.postUploadData(this.customerUrl + '/quatation', InquiryId).pipe(
    //   map(data => {
    //     return data;
    //   })
    // );
    return this.http.get( 'http://localhost:3000/quotation/changeStatus/send/' + inquiryId + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedApprove(inquiryId, customerId): Observable<any> {
    return this.http.get( 'http://localhost:3000/quotation/changeStatus/approve/' + inquiryId + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedReject(inquiryId, customerId): Observable<any> {
    return this.http.get( 'http://localhost:3000/quotation/changeStatus/reject/' + inquiryId + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedResend(inquiryId, customerId, handlingCompany): Observable<any> {
    return this.http.get( 'http://localhost:3000/quotation/changeStatus/resend/' + inquiryId + '/' + customerId + '/' + handlingCompany).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedGotReConsent(inquiryId, customerId): Observable<any> {
    return this.http.get( 'http://localhost:3000/quotation/changeStatus/resend_ingenii/' + inquiryId + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedSend(inquiryId, customerId): Observable<any> {
    return this.http.get( 'http://localhost:3000/quotation/changeStatus/remind/' + inquiryId + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

}
