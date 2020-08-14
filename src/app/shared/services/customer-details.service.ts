import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CustomerDetails} from '../../components/inquery/inquery/customer-details/customer-details/customer-details';
import {Router} from '@angular/router';
import {AuthenticationService} from './auth/authentication.service';
import {CommonHttpService} from './common/common-http.service';
import {Quatation} from '../../components/inquery/inquery/inquery-table/quatation/quatation/quatation';
import {CompanyCustomerDeails} from '../../components/inquery/inquery/inquery-table/customer-handling/CompanyCustomerDeails';
import {environment} from '../../../environments/environment';
import {CompanyType} from './common/enum';
import {ComplaintDetails} from '../../components/complaint/complaint-form/ComplaintDetails';


@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  customerUrl = 'customer';
  inquiryUrl = 'inquiry';
  quotationUrl = 'quotation';
  complaintUrl = 'complain';
  selectedCustomer;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private commonHttpService: CommonHttpService
  ) {
  }

  addCustomer(customer: CustomerDetails): Observable<any> {
    console.log(customer);
    return this.commonHttpService.postData(this.customerUrl + '/addCustomer', customer).pipe(  // http://localhost:5000/admin/customer/add//
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

  addInquery(inquery: CompanyCustomerDeails): Observable<any> {
    return this.commonHttpService.postData(this.customerUrl + '/inquery', inquery).pipe(
      map(data => {
        return data;
      })
    );
  }

  getQuotation(customerId): Observable<any> {
    return this.commonHttpService.getAll( this.quotationUrl + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  getAllInquiry(): Observable<any> {
    return this.commonHttpService.getAll(this.inquiryUrl + '/inquiryDetails').pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }


  getCustomerDetails(handlingCompany: any) {
    return this.commonHttpService.getAll(this.customerUrl + '/existing/' + handlingCompany).pipe(
      map(data => {
        // console.log(data);
        return data;
      })
    );
  }

  getCustomerList(): Observable<any> {
    return this.commonHttpService.getAll(this.customerUrl + '/getAllCustomers').pipe(
      map(data => {
        return data;
      })
    );
  }

  getStatusHistory(inquiryId): Observable<any>{
    return this.commonHttpService.getAll(this.inquiryUrl + '/getHistory/' + inquiryId).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedGotConsent(inquiryId, customerId): Observable<any> {
    return this.commonHttpService.putData( this.quotationUrl + '/changeStatus/send/' + inquiryId + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedApprove(inquiryId, customerId): Observable<any> {
    return this.commonHttpService.putData( this.quotationUrl + '/changeStatus/approve/' + inquiryId + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedReject(inquiryId, customerId): Observable<any> {
    return this.commonHttpService.putData( this.quotationUrl + '/changeStatus/reject/' + inquiryId + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedResend(inquiryId, customerId, handlingCompany): Observable<any> {
    return this.commonHttpService.putData( this.quotationUrl + '/changeStatus/resend/' + inquiryId + '/' + customerId + '/' + handlingCompany).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedGotReConsent(inquiryId, customerId): Observable<any> {
    return this.commonHttpService.putData( this.quotationUrl + '/changeStatus/resend_ingenii/' + inquiryId + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  clickedSend(inquiryId, customerId): Observable<any> {
    return this.commonHttpService.putData( this.quotationUrl + '/changeStatus/remind/' + inquiryId + '/' + customerId).pipe(
      map(data => {
        return data;
      })
    );
  }

  addComplaint(addComplaint: ComplaintDetails): Observable<any> {
    return this.commonHttpService.postData(this.complaintUrl +'/addComplain', addComplaint).pipe(
      map(data => {
        return data;
      })
    );
  }

//get complaint details for grid
  getAllComplains(): Observable<any> {
    return this.commonHttpService.getAll(this.complaintUrl + '/complainDetails').pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  //update status of complain table

  updateComplainStatus(id, statusId): Observable<any> {
    return this.commonHttpService.postData(this.complaintUrl + '/changeComplainStatus', {id, statusId}).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

}
