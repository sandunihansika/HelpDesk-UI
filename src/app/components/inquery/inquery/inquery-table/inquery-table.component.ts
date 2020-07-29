import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import { CommonGridComponent } from '../../../../shared/components/common-grid/common-grid.component';
import {Alignment, ColumnType} from '../../../../shared/services/common/enum';
import {CustomerDetailsService} from '../../../../shared/services/customer-details.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inquery-table',
  templateUrl: './inquery-table.component.html',
  styleUrls: ['./inquery-table.component.scss']
})
export class InqueryTableComponent implements OnInit {

  @ViewChild('inqueryGrid', { static: true }) inqueryGrid: CommonGridComponent;

  // companies = [
  //   {name: 'Ingenii'},
  //   {name: 'Dialog'},
  //   {name: 'Dimo'}
  // ]
  //
  // statuses = [
  //   {label: 'Pending', name: 'Pending'},
  //   {label: 'Need Consent', name: 'Need Consent'},
  //   {label: 'Sent Quotation', name: 'Sent Quotation'},
  //   {label: 'Reneed Consent', name: 'Reneed Consent'}
  // ]

  customer: any[];
  statusField: string;

  addAllow = true;
  editAllow = true;
  showToolBar = true;
  deleteAllow = true;
  showQuotation = true;
  showSearchBox = true;
  gotConsentAllow = false;

  constructor(public CustomerDetailsService: CustomerDetailsService,public route: Router) {
    //this.enableAuthorizedActions();
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
      {id: 1, name: 'Mark', nic: '957823918V', cperson: 'Micheal', cno: '0719873701', handlingcompany:'Dimo', address:'Colombo', status:'Pending' },
      {id: 2, name: 'Eric', nic: '961234567V', cperson: 'Fred', cno: '0701231234', handlingcompany:'Ingenii', address:'Kelaniya', status:'Sent Quotation' },
      {id: 3, name: 'Dean', nic: '979238792V', cperson: 'Sam', cno: '0769182732', handlingcompany:'Dialog', address:'Colombo', status:'Pending' },
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


  viewQuotation(item){
    this.statusField = item.status;
    this.CustomerDetailsService.data = item;
    this.route.navigate(['inquiry/quotation']);
  }


}
