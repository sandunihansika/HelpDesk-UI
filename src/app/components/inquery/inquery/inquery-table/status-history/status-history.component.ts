import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonGridComponent} from '../../../../../shared/components/common-grid/common-grid.component';
import {Alignment, ColumnType} from '../../../../../shared/services/common/enum';
import { CustomerDetailsService } from '../../../../../shared/services/customer-details.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-status-history',
  templateUrl: './status-history.component.html',
  styleUrls: ['./status-history.component.scss']
})
export class StatusHistoryComponent implements OnInit {

  @ViewChild("statusHistoryGrid", { static: true }) statusHistoryGrid: CommonGridComponent;

  addAllowHistory = false;
  showToolBar = true;
  showSearchBox = true;
  selectedCustomer;
  dataLoading1 = false;
  fName;
  lName;
  cName;
  id;

  constructor(public CustomerDetailsService: CustomerDetailsService, public dialogService:MatDialog) { }

  ngOnInit(): void {
    this.selectedCustomer = this.CustomerDetailsService.selectedCustomer;
    this.setStatusHistoryColumns();
    this.setStatusHistoryRows();
  }

  setStatusHistoryColumns() {
    this.statusHistoryGrid.columnsList = [
      {
        mappingName: "id",
        columnName: "Id",
        columnType: ColumnType.Number,
        columnAlignment: Alignment.Left,
        columnWidth: 20,
        columnFormat: null,
      },
      {
        mappingName: "createdAt",
        columnName: "Created Date",
        columnType: ColumnType.Date,
        columnAlignment: Alignment.Left,
        columnWidth: 50,
        columnFormat: "yyyy-MM-dd",
      },
      {
        mappingName: "status",
        subMappingName: "name",
        columnName: "Status",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 50,
        columnFormat: null,
      },
    ];
  }

  setStatusHistoryRows() {
    this.dataLoading1 = true;
    this.id = this.selectedCustomer.id;
    this.fName = this.selectedCustomer.customer.firstName;
    this.lName = this.selectedCustomer.customer.lastName;
    this.cName = this.selectedCustomer.customer.companyName;

    this.CustomerDetailsService.getStatusHistory(this.selectedCustomer.id).subscribe(
      (list: any) => {
        if (list.data !== undefined) {
          if (list.data) {
            this.statusHistoryGrid.rowLists = list.data;
            this.dataLoading1 = false;
          } else {
            this.statusHistoryGrid.rowLists = [];
            this.dataLoading1 = false;
          }
        }
      },
      (error) => {
        this.dataLoading1 = true;
        console.log(error);
      }
    );
  }
}
