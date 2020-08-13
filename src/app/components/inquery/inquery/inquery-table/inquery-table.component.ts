import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {CommonGridComponent} from '../../../../shared/components/common-grid/common-grid.component';
import {Alignment, ColumnType, CompanyType, Status} from '../../../../shared/services/common/enum';
import {CustomerDetailsService} from '../../../../shared/services/customer-details.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-inquery-table',
  templateUrl: './inquery-table.component.html',
  styleUrls: ['./inquery-table.component.scss']
})
export class InqueryTableComponent implements OnInit {

  @ViewChild('inqueryGrid', {static: true}) inqueryGrid: CommonGridComponent;
  @ViewChild('statusHistoryGrid', {static: true}) statusHistoryGrid: CommonGridComponent;

  customer: any[];

  addAllow = true;
  editAllow = true;
  showToolBar = true;
  deleteAllow = false;
  showQuotation = true;
  showSearchBox = true;
  addAllowHistory = false;
  display: boolean = false;
  displayHistory = false;
  new: string;
  exist: string;
  formEnqble: boolean = false;
  id: number;
  fName: string;
  cName: string;
  consent = true;
  dataLoading = false;


  constructor(public CustomerDetailsService: CustomerDetailsService, public route: Router) {

  }

  ngOnInit(): void {

    this.setInquiryColumns();
    this.setInquiryRowColumns();
    this.setStatusHistoryColumns();

  }

  setInquiryColumns() {
    this.inqueryGrid.columnsList = [
      {
        mappingName: 'id',
        columnName: 'Inquiry Id',
        columnType: ColumnType.Number,
        columnAlignment: Alignment.Left,
        columnWidth: 60,
        columnFormat: null
      },
      {
        mappingName: 'customerId',
        columnName: 'Customer Id',
        columnType: ColumnType.Number,
        columnAlignment: Alignment.Left,
        columnWidth: 75,
        columnFormat: null
      },
      {
        mappingName: 'customer',
        subMappingName: 'firstName',
        columnName: 'First Name',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'customer',
        subMappingName: 'lastName',
        columnName: 'Last Name',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'customer',
        subMappingName: 'nicNumber',
        columnName: 'NIC',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'customer',
        subMappingName: 'companyName',
        columnName: 'Company Name',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null
      },
      {
        mappingName: 'customer',
        subMappingName: 'companyRegistrationNo',
        columnName: 'Reg. No',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 50,
        columnFormat: null
      },
      {
        mappingName: 'contactPerson',
        columnName: 'Contact Person Name',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null
      },
      {
        mappingName: 'contactPersonNumber',
        columnName: 'Contact Person No',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'handlingCompanyName',
        columnName: 'Handling Company',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 80,
        columnFormat: null
      },
      // {
      //   mappingName: 'date',
      //   columnName: 'Date',
      //   columnType: ColumnType.Date,
      //   columnAlignment: Alignment.Left,
      //   columnWidth: 100,
      //   columnFormat: "yyyy-MM-dd"
      // },
      {
        mappingName: 'status',
        subMappingName: 'name',
        columnName: 'Status',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 130,
        columnFormat: null
      }
    ];
  }

  setStatusHistoryColumns() {
    this.statusHistoryGrid.columnsList = [
      {
        mappingName: 'id',
        columnName: 'Id',
        columnType: ColumnType.Number,
        columnAlignment: Alignment.Left,
        columnWidth: 20,
        columnFormat: null
      },
      {
        mappingName: 'createdAt',
        columnName: 'Created Date',
        columnType: ColumnType.Date,
        columnAlignment: Alignment.Left,
        columnWidth: 50,
        columnFormat: 'yyyy-MM-dd'
      },
      {
        mappingName: 'status',
        subMappingName: 'name',
        columnName: 'Status',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 50,
        columnFormat: null
      }
    ];
  }

  setInquiryRowColumns() {
    this.dataLoading = true;
    this.CustomerDetailsService.getAllInquiry().subscribe(
      (list: any) => {
        if(list.data !== undefined) {
          if(list.data) {
            list.data.forEach((item: any) => {
              Object.assign(item, {
                handlingCompanyName: this.getHandlingCompanyName(item.customer['handlingCompany'])
              });
            });
            this.inqueryGrid.rowLists = list.data;
            this.dataLoading = false;
          } else {
            this.inqueryGrid.rowLists = [];
            this.dataLoading = false;
          }
        }
      },
      error => {
        this.dataLoading = true;
        console.log(error);
      }
    );
  }

  getHandlingCompanyName(item: number) {
    if (item === CompanyType.Dimo) {
      return 'Dimo';
    } else if (item === CompanyType.Ingenii) {
      return 'Ingenii';
    }
  }

  viewQuotation(item) {
    try{
      this.CustomerDetailsService.selectedCustomer = item;
      this.route.navigate(['inquiry/quotation/',item.customerId]);
    } catch (error) {
      return error;
    }

  }

  addButtonClick() {
    this.display = true;
  }

  viewHistory(event) {
    this.id = event.id;
    this.fName = event.customer.firstName;
    this.cName = event.customer.companyName;
    this.statusHistoryGrid.dataLoading = true;
    this.displayHistory = true;
    this.inqueryGrid.selectedEntity = null;

    this.CustomerDetailsService.getStatusHistory(event.id).subscribe(
      (list: any) => {
        if(list.data !== undefined) {
          if(list.data) {
            this.statusHistoryGrid.rowLists = list.data;
            this.statusHistoryGrid.dataLoading = false;
          } else {
            this.statusHistoryGrid.rowLists = [];
            this.statusHistoryGrid.dataLoading = false;
          }
        }
      },
      error => {
        this.statusHistoryGrid.dataLoading = true;
        console.log(error);
      }
    );
  }

  gotConsent(event) {
    this.inqueryGrid.spinner = true;
    this.CustomerDetailsService.clickedGotConsent(event.id,event.customerId).subscribe(
      (list: any) => {
          if(list) {
            this.setInquiryRowColumns();
            this.inqueryGrid.selectedEntity = null;
            this.inqueryGrid.spinner = false;
          } else {
            this.inqueryGrid.rowLists = [];
            this.inqueryGrid.spinner = false;
          }
      },
      error => {
        this.inqueryGrid.spinner = true;
      }
    );
  }

  approve(event) {
    this.inqueryGrid.spinner = true;
    this.CustomerDetailsService.clickedApprove(event.id,event.customerId).subscribe(
      (list: any) => {
        if(list) {
          this.setInquiryRowColumns();
          this.inqueryGrid.selectedEntity = null;
          this.inqueryGrid.spinner = false;
        } else {
          this.inqueryGrid.rowLists = [];
          this.inqueryGrid.spinner = false;
        }
      },
      error => {
        this.inqueryGrid.spinner = true;
      }
    );
  }

  reject(event) {
    this.inqueryGrid.spinner = true;
    this.CustomerDetailsService.clickedReject(event.id,event.customerId).subscribe(
      (list: any) => {
        if(list) {
          this.setInquiryRowColumns();
          this.inqueryGrid.selectedEntity = null;
          this.inqueryGrid.spinner = false;
        } else {
          this.inqueryGrid.rowLists = [];
          this.inqueryGrid.spinner = false;
        }
      },
      error => {
        this.inqueryGrid.spinner = true;
      }
    );
  }

  resend(event) {
    this.inqueryGrid.spinner = true;
    this.CustomerDetailsService.clickedResend(event.id,event.customerId,event.customer.handlingCompany).subscribe(
      (list: any) => {
        if(list) {
          this.setInquiryRowColumns();
          this.inqueryGrid.selectedEntity = null;
          this.inqueryGrid.spinner = false;
        } else {
          this.inqueryGrid.rowLists = [];
          this.inqueryGrid.spinner = false;
        }
      },
      error => {
        this.inqueryGrid.spinner = true;
      }
    );
  }

  gotReConsent(event) {
    this.inqueryGrid.spinner = true;
    this.CustomerDetailsService.clickedGotReConsent(event.id,event.customerId).subscribe(
      (list: any) => {
        if(list) {
          this.setInquiryRowColumns();
          this.inqueryGrid.selectedEntity = null;
          this.inqueryGrid.spinner = false;
        } else {
          this.inqueryGrid.rowLists = [];
          this.inqueryGrid.spinner = false;
        }
      },
      error => {
        this.inqueryGrid.spinner = true;
      }
    );
  }

}
