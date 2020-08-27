import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidationHelpers} from '../../../../../../shared/helpers/form-validation-helpers';
import {CustomerDetailsService} from '../../../../../../shared/services/customer-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { TextBoxTypes } from 'src/app/shared/services/common/enum';
import {Quotation} from '../quatation/quatation';

@Component({
  selector: 'app-quotation-form',
  templateUrl: './quotation-form.component.html',
  styleUrls: ['./quotation-form.component.scss']
})
export class QuotationFormComponent implements OnInit {
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

  choosedFile = "Choose File....";


  constructor(
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private customerservice: CustomerDetailsService,
    public route: Router,
    public router: ActivatedRoute,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.selectedCustomer = this.customerservice.selectedCustomer;
    this.router.params.subscribe(
      (params) => (this.custId = parseInt(params["customerId"]))
    );
    console.log(this.custId);

    if (this.selectedCustomer) {
      if (this.selectedCustomer) {
        console.log(this.selectedCustomer);
        this.quotationForm = this.formbuilder.group({
          customerId: [this.selectedCustomer.id, [Validators.required]],
          description: ["", [Validators.required]],
          quotationNo: ["", [Validators.required]],
          expiryDate: ["", [Validators.required]],
          pdf: [[Validators.required]],
        });
      }else{
        this.quotationForm = this.formbuilder.group({
          customerId: [this.custId, [Validators.required]],
          description: ["", [Validators.required]],
          quotationNo: ["", [Validators.required]],
          expiryDate: ["", [Validators.required]],
          pdf: [[Validators.required]],
        });
      }
    }
  }
  send(event) {
    try {
      if (this.quotationForm.invalid) {
        this.formvalidationhelpers.validateAllFormFields(this.quotationForm);
        return;
      } else {

        if(this.selectedCustomer){
          this.customerservice
            .sendQuotationDetails(
              this.quotationForm.value,
              this.selectedCustomer.customerId,
              this.selectedCustomer.id
            )
            .subscribe((res) => {
              console.log(res);
            });
        }else{
          this.customerservice
            .sendQuotationDetails(
              this.quotationForm.value,
              this.custId,
              this.selectedCustomer.id
            )
            .subscribe((res) => {
              console.log(res);
            });
        }
        this.customerservice
          .clickedSend(event.id, event.customerId)
          .subscribe((res) => {
            console.log(res);
          });
      }
    } catch (e) {
      console.log(e);
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

  get description() {
    return this.quotationForm.get("description");
  }

  get quotationNo() {
    return this.quotationForm.get("quotationNo");
  }

  get expiryDate() {
    return this.quotationForm.get("expiryDate");
  }

  clear(form) {
    form.reset();
  }

  success() {
    this.toastrService.success("pdf Downloaded Successfuly!", "Success!");
  }


}
