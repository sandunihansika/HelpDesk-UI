import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as chartData from "./../../../shared/data/dashboard/default";
import * as chartDataPie from "../../../shared/data/chart/chartjs";
import { CustomerDetailsService } from "../../../shared/services/customer-details.service";
import { BehaviorSubject, Observable } from "rxjs";
import { LoggedUserDetails } from "../../../auth/logged-user-details";
import { MonthType, Status } from "../../../shared/services/common/enum";
import { Router } from "@angular/router";

declare var require: any;
var Knob = require("knob"); // browserify require

var primary = localStorage.getItem("primary_color") || "#4466f2";
var secondary = localStorage.getItem("secondary_color") || "#1ea6ec";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {
  dataLoading = false;
  needConsent;
  remindCustomer;
  pendingComplaints;
  reminders = [];
  complaints = [];
  dateDiff = [];

  //pie chart
  doughnutChartLabels1: string[] = [
    "Need Consent",
    "Send Quotation",
    "Remind Customer",
    "Approved Quotation",
    "Rejected Quotation",
    "Re-send Quotation",
    "Re-need Consent",
  ];
  doughnutChartLabels2: string[] = ["Completed", "Pending"];

  //doughnutChartData1: number[] = [350, 450, 100, 250, 100, 30, 40];
  doughnutChartData1: any = [];
  doughnutChartData2: any = [];

  doughnutChartColors1: any[] = [
    {
      backgroundColor: [
        "#afebf0",
        "#0bd2e3",
        "#f0e7af",
        "#edd221",
        "#FF5370",
        "#7fdb95",
        "#05a699",
      ],
    },
  ];
  doughnutChartColors2: any[] = [
    {
      backgroundColor: ["#0bd2e3", "#FF5370"],
    },
  ];

  doughnutChartType = "pie";
  doughnutChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
  };

  //bar chart
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  barChartLabels: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  barChartType = "bar";
  barChartLegend = false;
  // barChartData: any[] = [
  //   { data: [35, 59, 80, 81, 56, 55, 40], label: "Series A" },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" },
  // ];
  barChartData = [
    { data: [], label: "Inquiry" },
    { data: [], label: "Complaint" },
  ];
  barChartColors: Array<any> = [
    {
      backgroundColor: "#4466f2",
      borderColor: "rgba(30, 166, 236, 0.8)",
      borderWidth: 1,
    },
    {
      backgroundColor: "#79ccf7",
      borderColor: "#79ccf7",
      borderWidth: 1,
    },
  ];

  constructor(
    public CustomerDetailsService: CustomerDetailsService,
    public route: Router
  ) {}

  ngOnInit() {
    var profit = Knob({
      value: 35,
      angleOffset: 90,
      className: "review",
      thickness: 0.2,
      width: 270,
      height: 270,
      fgColor: primary,
      bgColor: "#f6f7fb",
      lineCap: "round",
    });
    //document.getElementById("profit").append(profit);
    this.setDoughnutData();
    this.setReminders();
    this.setPendingComplaints();
    this.setbarChartData();

    // this.barChartData[0].data[0] = 100;
    // console.log(this.barChartData[0].data[0]);
  }
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}

  setDoughnutData() {
    // this.CustomerDetailsService.getAllInquiry().subscribe((list: any) => {
    //   if (list.data !== undefined) {
    //     if (list.data) {
    //       //this.listData.next(list.data);
    //       list.data.forEach((item: any) => {
    //         if (item.status.name == "Need consent") {
    //           this.needConsent++;
    //         } else if (item.status.name == "Send quotation") {
    //           this.sendQuotation++;
    //         } else if (item.status.name == "Remind customer") {
    //           this.remindCustomer++;
    //         } else if (item.status.name == "Approved quotation") {
    //           this.approvedQuotation++;
    //         } else if (item.status.name == "Rejected quotation") {
    //           this.rejectedQuotation++;
    //         } else if (item.status.name == "Re-send quotation ") {
    //           this.resendQuotation++;
    //         } else if (item.status.name == "Re-need consent") {
    //           this.reneedConsent++;
    //         }
    //       });
    //
    //       // this.doughnutChartData1[0] = this.needConsent;
    //       // this.doughnutChartData1[1] = this.sendQuotation;
    //       // this.doughnutChartData1[2] = this.remindCustomer;
    //       // this.doughnutChartData1[3] = this.approvedQuotation;
    //       // this.doughnutChartData1[4] = this.rejectedQuotation;
    //       // this.doughnutChartData1[5] = this.resendQuotation;
    //       // this.doughnutChartData1[6] = this.reneedConsent;
    //     }
    //   }
    // });
    this.dataLoading = true;
    this.CustomerDetailsService.getStatusCount().subscribe(
      (list: any) => {
        if (list.data !== undefined) {
          if (list.data) {
            list.data.forEach((item: any) => {
              if (item.statusId === Status.NeedConsent) {
                this.needConsent = item.count;
                this.doughnutChartData1[0] = item.count;
              } else if (item.statusId === Status.SendQuotation) {
                this.doughnutChartData1[1] = item.count;
              } else if (item.statusId === Status.RemindCustomer) {
                this.remindCustomer = item.count;
                this.doughnutChartData1[2] = item.count;
              } else if (item.statusId === Status.ApprovedCustomer) {
                this.doughnutChartData1[3] = item.count;
              } else if (item.statusId === Status.RejectedCustomer) {
                this.doughnutChartData1[4] = item.count;
              } else if (item.statusId === Status.ReSendQuotation) {
                this.doughnutChartData1[5] = item.count;
              } else if (item.statusId === Status.ReNeedConsent) {
                this.doughnutChartData1[6] = item.count;
              }
              //this.doughnutChartData1.push(parseInt(item.count));
              this.dataLoading = false;
            });
            //console.log(this.doughnutChartData1);
          } else {
            this.doughnutChartData1 = [];
            this.dataLoading = false;
          }
        }
      },
      (error) => {
        this.dataLoading = true;
        console.log(error);
      }
    );

    this.CustomerDetailsService.getComplaintStatusCount().subscribe(
      (list: any) => {
        if (list.data !== undefined) {
          if (list.data) {
            list.data.forEach((item: any) => {
              if (item.statusId === Status.Pending) {
                this.pendingComplaints = item.count;
                this.doughnutChartData2[1] = item.count;
              } else if (item.statusId === Status.Completed) {
                this.doughnutChartData2[0] = item.count;
              }
              //this.doughnutChartData2.push(parseInt(item.count));
              this.dataLoading = false;
            });
          } else {
            this.doughnutChartData1 = [];
            this.dataLoading = false;
          }
        }
      },
      (error) => {
        this.dataLoading = true;
        console.log(error);
      }
    );
  }

  setbarChartData() {
    this.CustomerDetailsService.getDateCount().subscribe(
      (list: any) => {
        if (list.data !== undefined) {
          if (list.data) {
            //console.log(list.data);
            list.data.forEach((item: any) => {
              if (item.month === MonthType.January) {
                this.barChartData[0].data[0] = item.count;
              } else if (item.month === MonthType.February) {
                this.barChartData[0].data[1] = item.count;
              } else if (item.month === MonthType.March) {
                this.barChartData[0].data[2] = item.count;
              } else if (item.month === MonthType.April) {
                this.barChartData[0].data[3] = item.count;
              } else if (item.month === MonthType.May) {
                this.barChartData[0].data[4] = item.count;
              } else if (item.month === MonthType.June) {
                this.barChartData[0].data[5] = item.count;
              } else if (item.month === MonthType.July) {
                this.barChartData[0].data[6] = item.count;
              } else if (item.month === MonthType.August) {
                this.barChartData[0].data[7] = item.count;
              } else if (item.month === MonthType.September) {
                this.barChartData[0].data[8] = item.count;
              } else if (item.month === MonthType.October) {
                this.barChartData[0].data[9] = item.count;
              } else if (item.month === MonthType.November) {
                this.barChartData[0].data[10] = item.count;
              } else if (item.month === MonthType.December) {
                this.barChartData[0].data[11] = item.count;
              }
            });
          } else {
            this.barChartData[0].data = [];
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.CustomerDetailsService.getComplaintDateCount().subscribe(
      (list: any) => {
        if (list.data !== undefined) {
          if (list.data) {
            //console.log(list.data);
            list.data.forEach((item: any) => {
              if (item.month === MonthType.January) {
                this.barChartData[1].data[0] = item.count;
              } else if (item.month === MonthType.February) {
                this.barChartData[1].data[1] = item.count;
              } else if (item.month === MonthType.March) {
                this.barChartData[1].data[2] = item.count;
              } else if (item.month === MonthType.April) {
                this.barChartData[1].data[3] = item.count;
              } else if (item.month === MonthType.May) {
                this.barChartData[1].data[4] = item.count;
              } else if (item.month === MonthType.June) {
                this.barChartData[1].data[5] = item.count;
              } else if (item.month === MonthType.July) {
                this.barChartData[1].data[6] = item.count;
              } else if (item.month === MonthType.August) {
                this.barChartData[1].data[7] = item.count;
              } else if (item.month === MonthType.September) {
                this.barChartData[1].data[8] = item.count;
              } else if (item.month === MonthType.October) {
                this.barChartData[1].data[9] = item.count;
              } else if (item.month === MonthType.November) {
                this.barChartData[1].data[10] = item.count;
              } else if (item.month === MonthType.December) {
                this.barChartData[1].data[11] = item.count;
              }
            });
          } else {
            this.barChartData[1].data = [];
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setReminders() {
    this.CustomerDetailsService.getAllInquiry().subscribe(
      (list: any) => {
        if (list.data !== undefined) {
          if (list.data) {
            //console.log(list.data);
            list.data.forEach((item: any) => {
              if (item.statusId === Status.RemindCustomer) {
                this.reminders.push(item);
              }
            });
            console.log(this.reminders);
          } else {
            this.reminders = [];
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );

    // this.CustomerDetailsService.getDateDifference().subscribe(
    //   (list: any) => {
    //     if (list.data !== undefined) {
    //       if (list.data) {
    //         list.data.forEach((item: any) => {
    //           if (item.statusId === Status.RemindCustomer) {
    //             this.dateDiff.push(item);
    //           }
    //         });
    //         console.log(this.dateDiff);
    //       } else {
    //         this.dateDiff = [];
    //       }
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  setPendingComplaints() {
    this.CustomerDetailsService.getAllComplains().subscribe(
      (list: any) => {
        if (list !== undefined) {
          if (list) {
            list.forEach((item: any) => {
              if (item.statusId === Status.Pending) {
                this.complaints.push(item);
              }
            });
            //console.log(this.complaints);
          } else {
            this.complaints = [];
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  gotoInquiry() {
    this.route.navigate(["inquiry"]);
  }

  gotoComplaint() {
    this.route.navigate(["complain"]);
  }
}
