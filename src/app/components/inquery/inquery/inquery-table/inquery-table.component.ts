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

  customer: any[];

  addAllow = true;
  editAllow = false;
  showToolBar = true;
  deleteAllow = false;
  showQuotation = true;
  showSearchBox = true;
  // addAllow1 = true;
  // showToolBar1 = true;
  // showSearchBox1 = true;
  display: boolean = false;
  new: string;
  exist: string;
  formEnqble: boolean = false;


  constructor(public CustomerDetailsService: CustomerDetailsService, public route: Router) {

  }

  ngOnInit(): void {

    this.setInquiryColumns();
    this.setInquiryRowColumns();

  }

  setInquiryColumns() {
    this.inqueryGrid.columnsList = [
      {
        mappingName: 'id',
        columnName: 'Id',
        columnType: ColumnType.Number,
        columnAlignment: Alignment.Left,
        columnWidth: 50,
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
        subMappingName: 'companyName',
        columnName: 'Company Name',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 120,
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
        mappingName: 'customer',
        subMappingName: 'nicNumber',
        columnName: 'NIC',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
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
        columnWidth: 100,
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
        columnWidth: 120,
        columnFormat: null
      }
    ];
  }

  setInquiryRowColumns() {
    //this.inqueryGrid.rowLists = this.CustomerDetailsService.getAllInquiry();
    this.CustomerDetailsService.getAllInquiry().subscribe(
      (list: any) => {
        this.inqueryGrid.dataLoading = false;
        if(list !== undefined) {
          if(list) {
            list.forEach((item: any) => {
              Object.assign(item, {
                handlingCompanyName: this.getHandlingCompanyName(item.customer['handlingCompany'])
              });
            });
            this.inqueryGrid.rowLists = list;
          } else {
            this.inqueryGrid.rowLists = [];
          }
        }
      },
      error => {
        this.inqueryGrid.dataLoading = false;
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
      //console.log(item.status);
      this.route.navigate(['inquiry/quotation']);
    } catch (error) {
      return error;
    }

  }

  addButtonClick() {
    this.display = true;
  }

  gotConsent(event) {
    try {
      this.inqueryGrid.rowLists[0] = this.CustomerDetailsService.clickedGotConsent(event);
      //this.route.navigate(['inquiry'])
    } catch (error) {
      return error;
    }
  }

}
