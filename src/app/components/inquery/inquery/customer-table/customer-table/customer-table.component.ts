import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { CommonGridComponent } from "../../../../../shared/components/common-grid/common-grid.component";
import {
  Alignment,
  ColumnType,
  CompanyType,
  CustomerType,
} from "../../../../../shared/services/common/enum";
import { CustomerDetailsService } from "../../../../../shared/services/customer-details.service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-customer-table",
  templateUrl: "./customer-table.component.html",
  styleUrls: ["./customer-table.component.scss"],
})
export class CustomerTableComponent implements OnInit {
  @ViewChild("IndividualCompanyListGrid", { static: true })
  IndividualCompanyListGrid: CommonGridComponent;
  @ViewChild("CorporateCompanyListGrid", { static: true })
  CorporateCompanyListGrid: CommonGridComponent;

  addAllow = true;
  displayIndividual: boolean = false;
  displayCoporate: boolean = false;
  dataSource: any[];
  CusArray: any;
  dataLoading1 = false;
  dataLoading2 = false;
  setDialogBoxValue1 = false;
  setDialogBoxValue2 = false;
  selectedTabIndex: number;
  mySubscription: any;

  constructor(
    private CustomerDetailsService: CustomerDetailsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    // this.selectedTabIndex = parseInt(
    //   this.route.snapshot.queryParamMap.get("tab"),
    //   10
    // );
    // if (isNaN(this.selectedTabIndex) || this.selectedTabIndex < 0) {
    //   this.selectedTabIndex = 0;
    // }
    this.setIndividualCompanyColumns();
    this.setCorporateCompanyColumns();
    this.setCustomerRowList();
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  setIndividualCompanyColumns() {
    this.IndividualCompanyListGrid.columnsList = [
      {
        mappingName: "firstName",
        columnName: "First Name",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null,
      },
      {
        mappingName: "lastName",
        columnName: "Last Name",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null,
      },
      {
        mappingName: "nicNumber",
        columnName: "NIC",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 75,
        columnFormat: null,
      },
      {
        mappingName: "email",
        columnName: "Email",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null,
      },
      {
        mappingName: "handlingCompanyName",
        columnName: "Handling Company",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 120,
        columnFormat: null,
      },
      {
        mappingName: "city",
        columnName: "City",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 75,
        columnFormat: null,
      },
      {
        mappingName: "streetAddressLineOne",
        columnName: "Address Line One",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null,
      },
      {
        mappingName: "streetAddressLineTwo",
        columnName: "Address Line Two",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null,
      },
    ];
  }

  setCorporateCompanyColumns() {
    this.CorporateCompanyListGrid.columnsList = [
      {
        mappingName: "companyName",
        columnName: "Name",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 75,
        columnFormat: null,
      },
      {
        mappingName: "companyRegistrationNo",
        columnName: "Registration No",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 75,
        columnFormat: null,
      },
      {
        mappingName: "telNo",
        columnName: "Contact No",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null,
      },
      {
        mappingName: "handlingCompanyName",
        columnName: "Handling Company",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 120,
        columnFormat: null,
      },
      {
        mappingName: "city",
        columnName: "City",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 75,
        columnFormat: null,
      },
      {
        mappingName: "streetAddressLineOne",
        columnName: "Address Line One",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null,
      },
      {
        mappingName: "streetAddressLineTwo",
        columnName: "Address Line Two",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 110,
        columnFormat: null,
      },
    ];
  }

  setCustomerRowList() {
    // this.CusArray = this.CustomerDetailsService.getRegisteredCustomerList();
    // console.log(this.CusArray);
    //
    // const result1 = this.CusArray.filter(CusArray=> CusArray.type === CustomerType.Individual);
    // this.IndividualCompanyListGrid.rowLists = result1;
    // const result2 = this.CusArray.filter(CusArray=> CusArray.type === CustomerType.Corporate);
    // this.CorporateCompanyListGrid.rowLists = result2;
    this.dataLoading1 = true;
    this.dataLoading2 = true;
    this.CustomerDetailsService.getCustomerList().subscribe(
      (list: any) => {
        if (list.data !== undefined) {
          if (list.data) {
            list.data.forEach((item: any) => {
              Object.assign(item, {
                handlingCompanyName: this.getHandlingCompanyName(
                  item["handlingCompany"]
                ),
              });
            });
            this.putDataIntoTable(list.data);
           this.dataLoading1 = false;
           this.dataLoading2 = false;
          } else {
            this.IndividualCompanyListGrid.rowLists = [];
            this.dataLoading1 = false;
            this.CorporateCompanyListGrid.rowLists = [];
            this.dataLoading2 = false;
          }
        }
      },
      (error) => {
        this.dataLoading1 = true;
        this.dataLoading2 = true;
        console.log(error);
      }
    );
  }

  putDataIntoTable(data) {
    this.IndividualCompanyListGrid.rowLists = [];
    this.CorporateCompanyListGrid.rowLists = [];
    data.forEach((item) => {
      if (item.type === CustomerType.Individual) {
        this.IndividualCompanyListGrid.rowLists.push(item);
      } else if (item.type === CustomerType.Corporate) {
        this.CorporateCompanyListGrid.rowLists.push(item);
      }
    });
  }

  getHandlingCompanyName(item: number) {
    if (item === CompanyType.Dimo) {
      return "Dimo";
    } else if (item === CompanyType.Ingenii) {
      return "Ingenii";
    }
  }

  viewIndividualForm() {
    try {
      this.setDialogBoxValue1 = true;
      this.displayIndividual = true;
    } catch (error) {
      return error;
    }
  }

  viewCorporateForm() {
    try {
      this.setDialogBoxValue2 = true;
      this.displayCoporate = true;
    } catch (error) {
      return error;
    }
  }
  close() {
    this.setDialogBoxValue1 = false;
    this.setDialogBoxValue2 = false;
  }

  submitClick1() {
    this.setDialogBoxValue1 = false;
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = "reload";
    // this.setCustomerRowList();
    // this.router.navigate(["/inquiry/customer"]);
    this.router.navigate([this.route.url]);
  }

  submitClick2() {
    this.setDialogBoxValue2 = false;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.setCustomerRowList();
    //this.router.navigate(["/inquiry/customer"]);
    this.router.navigate(["inquiry/customer"]);
  }

  onTabChange(selectedTabIndex: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        tab: selectedTabIndex,
      },
    });
    this.selectedTabIndex = selectedTabIndex;
    console.log(this.selectedTabIndex);
  }
}
