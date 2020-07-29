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
  //@ViewChild('quotationGrid', { static: true }) quotationGrid: CommonGridComponent;


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
  // id: any;
  // name: string;
  // handlingcompany: string;
  customer: any[];

  addAllow = true;
  editAllow = true;
  showToolBar = true;
  deleteAllow = true;
  showQuotation = true;
  showSearchBox = true;
  // addAllow1 = true;
  // showToolBar1 = true;
  // showSearchBox1 = true;
  // display: boolean = false;

  constructor(public CustomerDetailsService: CustomerDetailsService,public route: Router) { }

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


    // this.quotationGrid.columnsList = [
    //   {
    //     mappingName: 'id',
    //     columnName: 'Id',
    //     columnType: ColumnType.Number,
    //     columnAlignment: Alignment.Left,
    //     columnWidth: 100,
    //     columnFormat: null
    //   },
    //   {
    //     mappingName: 'cid',
    //     columnName: 'Customer Id',
    //     columnType: ColumnType.Text,
    //     columnAlignment: Alignment.Left,
    //     columnWidth: 100,
    //     columnFormat: null
    //   },
    //   {
    //     mappingName: 'qno',
    //     columnName: 'Quotation Number',
    //     columnType: ColumnType.Text,
    //     columnAlignment: Alignment.Left,
    //     columnWidth: 100,
    //     columnFormat: null
    //   },
    //   {
    //     mappingName: 'description',
    //     columnName: 'Description',
    //     columnType: ColumnType.Text,
    //     columnAlignment: Alignment.Left,
    //     columnWidth: 100,
    //     columnFormat: null
    //   },
    //   {
    //     mappingName: 'expirydate',
    //     columnName: 'Expiry Date',
    //     columnType: ColumnType.Date,
    //     columnAlignment: Alignment.Left,
    //     columnWidth: 100,
    //     columnFormat: 'yyyy-MM-dd'
    //   },
    //   {
    //     mappingName: 'createddate',
    //     columnName: 'Created Date',
    //     columnType: ColumnType.Date,
    //     columnAlignment: Alignment.Left,
    //     columnWidth: 100,
    //     columnFormat: 'yyyy-MM-dd'
    //   },
    //   {
    //     mappingName: 'pdf',
    //     columnName: 'PDF',
    //     columnType: ColumnType.Text,
    //     columnAlignment: Alignment.Left,
    //     columnWidth: 100,
    //     columnFormat: null
    //   }
    // ];
    //
    // this.quotationGrid.rowLists = [
    //   {id: 1, cid: 12, qno: 'ab120', description: 'kdjndcjzka', expirydate:'2020-10-10', createddate:'2020-07-23', pdf:'' },
    //   {id: 2, cid: 23, qno: 'dc234', description: 'asnxakkkj', expirydate:'20202-11-11', createddate:'2020-07-23', pdf:'' },
    //   {id: 3, cid: 34, qno: 'sd256', description: 'akjsxnkxn', expirydate:'2020-12-12', createddate:'2020-07-23', pdf:'' },
    // ];

  }

  viewQuotation(item){
    // this.id = event.id;
    // this.name = event.name;
    // this.handlingcompany = event.handlingcompany;
    //this.display = true;
    this.CustomerDetailsService.data = item;
    this.route.navigate(['inquiry/quotation']);
  }


}
