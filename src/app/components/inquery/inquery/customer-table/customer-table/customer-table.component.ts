import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonGridComponent} from '../../../../../shared/components/common-grid/common-grid.component';
import {Alignment, ColumnType} from '../../../../../shared/services/common/enum';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  @ViewChild('IndividualCompanyListGrid', { static: true }) IndividualCompanyListGrid: CommonGridComponent;
  @ViewChild('CorporateCompanyListGrid', { static: true }) CorporateCompanyListGrid: CommonGridComponent;

  addAllow = true;
  displayIndividual: boolean = false;
  displayCoporate: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.IndividualCompanyListGrid.columnsList = [
      {
        mappingName: 'fname',
        columnName: 'First Name',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'lname',
        columnName: 'Last Name',
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
        columnWidth: 75,
        columnFormat: null
      },
      {
        mappingName: 'email',
        columnName: 'Email',
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
      {
        mappingName: 'city',
        columnName: 'City',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 75,
        columnFormat: null
      },
      {
        mappingName: 'address1',
        columnName: 'Address Line One',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null
      },
      {
        mappingName: 'address2',
        columnName: 'Address Line Two',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null
      }
    ];

    this.CorporateCompanyListGrid.columnsList = [
      {
        mappingName: 'name',
        columnName: 'Name',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 75,
        columnFormat: null
      },
      {
        mappingName: 'regno',
        columnName: 'Registration No',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 75,
        columnFormat: null
      },
      {
        mappingName: 'contactp',
        columnName: 'Contact Person',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'contactno',
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
      {
        mappingName: 'city',
        columnName: 'City',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 75,
        columnFormat: null
      },
      {
        mappingName: 'address1',
        columnName: 'Address Line One',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null
      },
      {
        mappingName: 'address2',
        columnName: 'Address Line Two',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null
      }
    ];

  }

  viewIndividualForm(){
    this.displayIndividual = true;
  }

  viewCorporateForm(){
    this.displayCoporate = true;
  }

}
