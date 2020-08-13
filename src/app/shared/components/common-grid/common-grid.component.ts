import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Alignment, ColumnType, Status} from '../../services/common/enum';

export class ColumnDefinition {
  mappingName: string;
  subMappingName?: string;
  columnName: string;
  columnType: ColumnType;
  columnAlignment: Alignment;
  columnWidth: number;
  columnFormat: string;
}

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  styleUrls: ['./common-grid.component.scss']
})
export class CommonGridComponent implements OnInit {

  @ViewChild('grid', { static: false }) grid: any;
  @Output() addBtnClicked = new EventEmitter();
  @Output() editBtnClicked = new EventEmitter();
  @Output() refreshBtnClicked = new EventEmitter();
  @Output() deleteBtnClicked = new EventEmitter();

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

  public columnsList: ColumnDefinition[] = [];
  globalFilterFieldList = [];
  rowLists: any[] = [];
  cols: any[];
  elements: any[];
  dataLoading = false;
  selectionMode = 'single';
  selectedEntity: any;
  rowsPerPage = 10;
  rowsPerPageOptions = [10, 20, 50];
  defaultPaginationEnabled = true;
  display = false;
  spinner = false;

  @Input() showToolBar = true;
  @Input() addAllow = true;
  @Input() editAllow = false;
  @Input() deleteAllow = false;
  @Input() showQuotation = false;
  @Input() showSearchBox = true;
  // @Input() colType: string;
  @Input() header: string;

  constructor() { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  GlobalSearchList() {
    this.globalFilterFieldList = [];
    this.columnsList.forEach(item => {
      if (item) {
        if (item.mappingName) {
          this.globalFilterFieldList.push(item.mappingName);
        }
      }
    });
    return this.globalFilterFieldList;
  }

  addClick() {
    this.addBtnClicked.emit(1);
  }

  editClick() {
    this.editBtnClicked.emit(1);
  }

  deleteClick() {
    this.deleteBtnClicked.emit(1);
  }

}
