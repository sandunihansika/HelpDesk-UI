import { Component, OnInit, ViewChild } from "@angular/core";
import { Quotation } from "./quatation";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ColumnType,
  TextBoxTypes,
  Alignment,
} from "../../../../../../shared/services/common/enum";
import { FormValidationHelpers } from "../../../../../../shared/helpers/form-validation-helpers";
import { CustomerDetailsService } from "../../../../../../shared/services/customer-details.service";
import { CommonGridComponent } from "../../../../../../shared/components/common-grid/common-grid.component";
import { ActivatedRoute, Router } from "@angular/router";
import * as fileSaver from "file-saver";
import { HttpResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-quatation",
  templateUrl: "./quatation.component.html",
  styleUrls: ["./quatation.component.scss"],
})
export class QuatationComponent implements OnInit {
  @ViewChild("quotationGrid", { static: true })
  quotationGrid: CommonGridComponent;

  addAllow1 = false;
  showToolBar1 = true;
  showSearchBox1 = true;
  quotationForm: FormGroup;
  quotation: Quotation;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  uploadedFiles: any[] = [];
  setDialogBoxValue = false;
  display = false;
  dataLoading = false;
  visible = false;
  url;
  selectedCustomer;
  custId;
  firstName;
  lastName;
  companyName;
  buttonEnable = false;
  visibleAlert = false;

  choosedFile = "Choose File....";

  constructor(
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private customerservice: CustomerDetailsService,
    public route: Router,
    public router: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.selectedCustomer = this.customerservice.selectedCustomer;
    this.router.params.subscribe(
      (params) => (this.custId = parseInt(params["customerId"]))
    );
    console.log(this.custId);
    if (this.selectedCustomer) {
      console.log(this.selectedCustomer);
      this.quotationForm = this.formbuilder.group({
        customerId: [this.selectedCustomer.id, [Validators.required]],
        description: ["", [Validators.required]],
        quotationNo: ["", [Validators.required]],
        expiryDate: ["", [Validators.required]],
        pdf: [[Validators.required]],
      });
      this.setQuotationColumns();
      this.setQuotationRowList(this.selectedCustomer.customerId);
    } else {
      this.quotationForm = this.formbuilder.group({
        customerId: [this.custId, [Validators.required]],
        description: ["", [Validators.required]],
        quotationNo: ["", [Validators.required]],
        expiryDate: ["", [Validators.required]],
        pdf: [[Validators.required]],
      });
      this.setQuotationColumns();
      this.setQuotationRowList(this.custId);
      this.getStatus(this.custId);
    }
  }

  setQuotationColumns() {
    this.quotationGrid.columnsList = [
      {
        mappingName: "id",
        columnName: "Id",
        columnType: ColumnType.Number,
        columnAlignment: Alignment.Left,
        columnWidth: 30,
        columnFormat: null,
      },
      {
        mappingName: "quotationNo",
        columnName: "Quotation Number",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null,
      },
      {
        mappingName: "expiryDate",
        columnName: "Expiry Date",
        columnType: ColumnType.Date,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: "yyyy-MM-dd",
      },
      {
        mappingName: "createdBy",
        columnName: "Created By",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null,
      },
      {
        mappingName: "description",
        columnName: "Description",
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null,
      },
      {
        mappingName: "pdf",
        columnName: "Pdf",
        columnType: ColumnType.Custom,
        columnAlignment: Alignment.Center,
        columnWidth: 37,
        columnFormat: null,
      },
    ];
  }

  setQuotationRowList(customerId) {
    this.quotationGrid.dataLoading = true;
    this.customerservice.getQuotation(customerId).subscribe(
      (list: any) => {
        if (list.data !== undefined) {
          if (list.data) {
            this.quotationGrid.rowLists = list.data;
            this.quotationGrid.dataLoading = false;
          } else {
            this.quotationGrid.rowLists = [];
            this.quotationGrid.dataLoading = false;
          }
        }
      },
      (error) => {
        this.quotationGrid.dataLoading = true;
        console.log(error);
      }
    );
  }

  getStatus(customerId) {
    this.customerservice.getAllInquiry().subscribe((list: any) => {
      if (list.data !== undefined) {
        if (list.data) {
          list.data.forEach((item: any) => {
            if (customerId == item.customerId) {
              this.firstName = item.customer.firstName;
              this.lastName = item.customer.lastName;
              this.companyName = item.customer.companyName;
              if (item.status.name == "Send quotation") {
                this.visible = true;
              } else if (item.status.name == "Re-send quotation ") {
                this.visible = true;
              } else {
                this.visible = false;
              }
            }
          });
        }
      }
    });
  }

  viewForm() {
    try {
      this.setDialogBoxValue = true;
      //this.visible = false;
    } catch (error) {
      return error;
    }
  }

  back() {
    try {
      this.route.navigate(["inquiry"]);
    } catch (error) {
      return error;
    }
  }

  onUpload(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.choosedFile = file.name;
      console.log(file);
      this.quotationForm.patchValue({
        pdf: file,
      });
    }
  }

  saveQuatation() {
    console.log(this.quotationForm.value);
    if (this.quotationForm.invalid) {
      this.formvalidationhelpers.validateAllFormFields(this.quotationForm);
      return;
    } else if (this.quotationForm.invalid) {
      this.customerservice
        .addQuatation(this.quotationForm.value, this.quotation.customerId)
        .subscribe((respond) => {
          /**/
        });
    }
  }

  get description() {
    return this.quotationForm.get("description");
  }

  get quotationNo() {
    return this.quotationForm.get("quotationNo");
  }

  get expiryDate() {
    return this.quotationForm.get("expiryDate");
  }

  send(event) {
    try {
      if (this.quotationForm.invalid) {
        this.formvalidationhelpers.validateAllFormFields(this.quotationForm);
        return;
      } else {
        console.log(this.selectedCustomer.customerId);
        this.customerservice
          .sendQuotationDetails(
            this.quotationForm.value,
            this.selectedCustomer.customerId,
            this.selectedCustomer.id
          )
          .subscribe((res) => {
            console.log(res);
          });

        this.customerservice
          .clickedSend(event.id, event.customerId)
          .subscribe((res) => {
            console.log(res);
          });
        this.quotationForm.reset();
        this.close();
        location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  }
  addButtonClick() {
    this.setDialogBoxValue = true;
  }

  downloadPdf(quotationNo) {
    const qNo = parseInt(quotationNo);
    console.log(quotationNo);
    try {
      if (this.selectedCustomer) {
        this.downloadPdfFile(this.selectedCustomer.customerId, quotationNo);
      } else {
        this.downloadPdfFile(this.custId, quotationNo);
      }
    } catch (e) {
      console.log("download fails!!");
      console.log(e);
    }
  }

  clear(form) {
    form.reset();
  }

  close() {
    this.setDialogBoxValue = false;
  }

  downloadPdfFile(customerId, quotationNo) {
    this.customerservice.downloadPdf(customerId, quotationNo).subscribe(
      (response) => {
        console.log(response);
        //create blob object with file content in response
        let blob: any = new Blob([response], {
          type: "application/json",
        });
        const url = window.URL.createObjectURL(blob);
        //window.open(url);
        // window.location.href = response.url;
        fileSaver.saveAs(blob, quotationNo + ".pdf");
        this.success();
      },
      (error) => {
        this.danger();
        console.log("Error downloading the file");
      },
      () => console.info("File downloaded successfully")
    );
  }

  success() {
    this.toastrService.success("pdf Downloaded Successfuly!", "Success!");
  }
  danger() {
    this.toastrService.error(
      "Download Failed! This file cannot be found!",
      "Error!"
    );
  }
}
