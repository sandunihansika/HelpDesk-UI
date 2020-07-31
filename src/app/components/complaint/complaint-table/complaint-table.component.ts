import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonGridComponent} from '../../../shared/components/common-grid/common-grid.component';
import {Alignment, ColumnType} from '../../../shared/services/common/enum';

@Component({
  selector: 'app-complaint-table',
  templateUrl: './complaint-table.component.html',
  styleUrls: ['./complaint-table.component.scss']
})

export class ComplaintTableComponent implements OnInit {
  @ViewChild('complaintGrid', {static: true}) complaintGrid: CommonGridComponent;

  addAllow = true;
  editAllow = false;
  showToolBar = true;
  deleteAllow = false;
  showSearchBox = true;
  display = false;
  status ="pending";

  addButtonClick() {
    this.display = true;
  }

  ngOnInit() {

    this.complaintGrid.columnsList = [
      {
        mappingName: 'id',
        columnName: 'Id',
        columnType: ColumnType.Number,
        columnAlignment: Alignment.Left,
        columnWidth: 45,
        columnFormat: null
      },
      {
        mappingName: 'name',
        columnName: 'Name',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 70,
        columnFormat: null
      },
      {
        mappingName: 'handlingcompany',
        columnName: 'Handling Company',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'type',
        columnName: 'Type',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'cno',
        columnName: 'Contact No',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 70,
        columnFormat: null
      },
      {
        mappingName: 'description',
        columnName: 'Description',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 150,
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

    this.complaintGrid.rowLists = [
      {
        id: 1,
        name: 'Mark',
        handlingcompany : 'Ingenii',
        type : 'Sim Problem',
        cno: '0719813701',
        description : 'not working',
        status: this.status
      },
      {
        id: 2,
        name: 'Danial',
        handlingcompany : 'Ingenii',
        type : 'Sim Problem',
        cno: '0719473701',
        description : 'not working',
        status: this.status
      }, {
        id: 3,
        name: 'Eleena',
        handlingcompany : 'Dimo',
        type : 'Sim Problem',
        cno: '0719873801',
        description : 'not working',
        status: this.status
      }, {
        id: 4,
        name: 'Bella',
        handlingcompany : 'Dimo',
        type : 'Sim Problem',
        cno: '0719873705',
        description : 'not working',
        status: this.status
      }, {
        id: 5,
        name: 'Kevin',
        handlingcompany : 'Dialog',
        type : 'Sim Problem',
        cno: '0719845705',
        description : 'not working',
        status: this.status
      },

    ]
   }

  changeStatus(event){
    // this.status = "completed";
    // this.ngOnInit();
    console.log("helooooooo")
  }



}
