import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {CommonGridComponent} from '../../../../shared/components/common-grid/common-grid.component';
import {Alignment, ColumnType, Status} from '../../../../shared/services/common/enum';
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
        mappingName: 'name',
        columnName: 'Name',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'nic',
        columnName: 'NIC',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'cperson',
        columnName: 'Contact Person',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null
      },
      {
        mappingName: 'cno',
        columnName: 'Contact No',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'handlingcompany',
        columnName: 'Handling Company',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 120,
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
        mappingName: 'address',
        columnName: 'Address',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'status',
        columnName: 'Status',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      }
    ];

    this.inqueryGrid.rowLists = [
      {
        id: 1,
        name: 'Mark',
        nic: '957823918V',
        cperson: 'Micheal',
        cno: '0719873701',
        handlingcompany: 'Dimo',
        address: 'Colombo',
        status: 'Need_Consent'
      },
      {
        id: 2,
        name: 'Eric',
        nic: '961234567V',
        cperson: 'Fred',
        cno: '0701231234',
        handlingcompany: 'Ingenii',
        address: 'Kelaniya',
        status: 'Send_Quotation'
      },
      {
        id: 3,
        name: 'Dean',
        nic: '979238792V',
        cperson: 'Sam',
        cno: '0769182732',
        handlingcompany: 'Dialog',
        address: 'Colombo',
        status: 'Remind_Customer'
      },
    ];

    // this.inqueryGrid.dataLoading = true;
    // this.CustomerDetailsService.getAllCustomers().subscribe(
    //   (list: any) => {
    //     this.inqueryGrid.dataLoading = false;
    //     if (list !== undefined) {
    //       if (list.data) {
    //         this.inqueryGrid.rowLists = list.data;
    //         this.inqueryGrid.rowLists.forEach((item: any) => {
    //           Object.assign(item, {
    //             handlingCompanyName: this.getHandlingCompanyName(item['clientId']),
    //             displayName: item['company'] !== null ? item['company']['displayName'] : 'No Company'
    //           });
    //         });
    //       } else {
    //         this.inqueryGrid.rowLists = [];
    //       }
    //     }
    //   },
    //   error => {
    //     this.inqueryGrid.dataLoading = false;
    //   }
    // );


  }

  viewQuotation(item) {
    this.CustomerDetailsService.selectedCustomer = item;
    //console.log(item.status);
    this.route.navigate(['inquiry/quotation']);
  }

  addButtonClick() {
    this.display = true;
  }

  gotConsent() {

  }

}
