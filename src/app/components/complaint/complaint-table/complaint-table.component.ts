import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { CommonGridComponent } from "../../../shared/components/common-grid/common-grid.component";
import {
  Alignment,
  ColumnType,
  CompanyType,
  Status,
} from "../../../shared/services/common/enum";
import { CustomerDetailsService } from "../../../shared/services/customer-details.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbdModalContent } from "../../base/modal/modal.component";
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { CommonDialogBoxComponent } from "../../../shared/components/common-dialog-box/common-dialog-box.component";
import {async} from 'rxjs-compat/scheduler/async';
import {ComplaintFormComponent} from '../complaint-form/complaint-form.component';

@Component({
  selector: "app-complaint-table",
  templateUrl: "./complaint-table.component.html",
  styleUrls: ["./complaint-table.component.scss"],
})
export class ComplaintTableComponent implements OnInit {
  @ViewChild("complaintGrid", { static: true })
  complaintGrid: CommonGridComponent;
  @ViewChild("complaintDialogBox", { static: true })
  complaintDialogBox: CommonDialogBoxComponent;

  @Output() btnClicked = new EventEmitter();

  constructor(
    private customerDetailsService: CustomerDetailsService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    config: NgbModalConfig,

  ) {}

  addAllow = false;
  // editAllow = true;
  showToolBar = true;
  deleteAllow = false;
  showSearchBox = true;
  display = false;
  status = "pending";
  status1 = "pending";
  status2 = "pending";
  status3 = "pending";
  showDialogBox = false;
  setDialogBoxValue = false;
  headerName = "Complaint Form";
  setDialog = false;
  dataLoading = false;

  ngOnInit() {
    this.setComplainColomn();
    this.setComplainRow();
    // this.checkButton = true;
  }

  setComplainColomn() {
    this.complaintGrid.columnsList = [
      {
        mappingName: "id",
        columnName: "Id",
        columnType: ColumnType.Number,
        columnAlignment: Alignment.Left,
        columnWidth: 45,
        columnFormat: null,
      },
      {
        mappingName: "customer",
        subMappingName: "firstName",
        columnName: "Name",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 70,
        columnFormat: null,
      },
      {
        mappingName: "handlingCompanyName",
        columnName: "Handling Company",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null,
      },
      {
        mappingName: "complainType",
        subMappingName: "name",
        columnName: "Type",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null,
      },
      {
        mappingName: "contactPersonNumber",
        columnName: "Contact No",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 80,
        columnFormat: null,
      },
      {
        mappingName: "contactPerson",
        columnName: "Contact Person",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 80,
        columnFormat: null,
      },
      {
        mappingName: "description",
        columnName: "Description",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 150,
        columnFormat: null,
      },
      {
        mappingName: "status",
        subMappingName: "name",
        columnName: "Status",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 120,
        columnFormat: null,
      },
    ];
  }

  setComplainRow() {
    //console.log("xxxxxxxxxxxxxxxxx");
    this.dataLoading = true;
    this.customerDetailsService.getAllComplains().subscribe(
      (list: any) => {
        // console.log(list.status.name);
        if (list !== undefined) {
          if (list) {
            list.forEach((item: any) => {
              Object.assign(item, {
                handlingCompanyName: this.getHandlingCompanyName(
                  item.customer["handlingCompany"]
                ),
              });
            });
            this.complaintGrid.rowLists = list;
            this.dataLoading = false;
          } else {
            this.complaintGrid.rowLists = [];
            this.dataLoading = false;
          }
        }
      },
      (error) => {
        this.dataLoading = true;
      }
    );
  }

  // changeStatus(event){
  //   console.log("helooooooo")
  //   this.status = "completed";
  //   this.ngOnInit();
  //
  // }
  getHandlingCompanyName(item: number) {
    try {
      if (item === CompanyType.Dimo) {
        return "Dimo";
      } else if (item === CompanyType.Ingenii) {
        return "Ingenii";
      }
    } catch (e) {
      console.log(e);
    }
  }

  changeStatus(event){
    // this.checkButton = false;
    this.complaintGrid.spinner = true;
    const status = Status.Completed;
    const id = event.id;
    // event = null;

    console.log(event);

    try{
      this.customerDetailsService.updateComplainStatus(id,status).
      subscribe((res)=>{
        this.setComplainRow();
        this.complaintGrid.selectedEntity = null;
        this.complaintGrid.spinner = false;
      })
    }
    catch (e) {
      console.log(e);
      this.complaintGrid.spinner = true;
    }
    // try {
    //   this.inqueryGrid.rowLists[0] = this.CustomerDetailsService.clickedGotConsent(event);
    //   //this.route.navigate(['inquiry'])
    // } catch (error) {
    //   return error;
  }

  //add dialog box
  addButtonClick() {
    // this.setDialog = true;
    this.setDialogBoxValue = true;
    // this.display = true;
    // this.showDialogBox = true;
  }
  close() {
    this.setDialogBoxValue = false;
    this.setComplainRow();

  }

  SubmitClick() {
    this.close();
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = "reload";
    // this.setComplainRow();
    // this.router.navigate(["/complain"]);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.setComplainRow();
    this.router.navigate(["/complain"]);
  }
}
