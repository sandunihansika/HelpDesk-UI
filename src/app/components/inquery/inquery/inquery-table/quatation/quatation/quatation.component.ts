import {Component, OnInit, ViewChild} from '@angular/core';
import {Quatation} from './quatation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColumnType, TextBoxTypes, Alignment} from '../../../../../../shared/services/common/enum';
import {FormValidationHelpers} from '../../../../../../shared/helpers/form-validation-helpers';
import {CustomerDetailsService} from '../../../../../../shared/services/customer-details.service';
import {CommonGridComponent} from '../../../../../../shared/components/common-grid/common-grid.component';


@Component({
  selector: 'app-quatation',
  templateUrl: './quatation.component.html',
  styleUrls: ['./quatation.component.scss']
})
export class QuatationComponent implements OnInit {
  @ViewChild('quotationGrid', {static: true}) quotationGrid: CommonGridComponent;

  addAllow1 = false;
  showToolBar1 = true;
  showSearchBox1 = true;
  quatationForm: FormGroup;
  quatation: Quatation;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  uploadedFiles: any[] = [];

  display = false;
  selectedCustomer;




  constructor(
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private customerservice: CustomerDetailsService
  ) {
  }

  ngOnInit(): void {
    this.selectedCustomer = this.customerservice.selectedCustomer;
    this.quatationForm = this.formbuilder.group({
      customerId: [this.selectedCustomer.id, [Validators.required]],
      description: ['', [Validators.required]],
      quatationNo: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      pdf: [[Validators.required]]
    });


    this.quotationGrid.columnsList = [
      {
        mappingName: 'id',
        columnName: 'Id',
        columnType: ColumnType.Number,
        columnAlignment: Alignment.Left,
        columnWidth: 30,
        columnFormat: null
      },
      {
        mappingName: 'qno',
        columnName: 'Quotation Number',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'description',
        columnName: 'Description',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      },
      {
        mappingName: 'expirydate',
        columnName: 'Expiry Date',
        columnType: ColumnType.Date,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: 'yyyy-MM-dd'
      },
      {
        mappingName: 'createddate',
        columnName: 'Created Date',
        columnType: ColumnType.Date,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: 'yyyy-MM-dd'
      },
      {
        mappingName: 'pdf',
        columnName: 'PDF',
        columnType: ColumnType.Text,
        columnAlignment: Alignment.Left,
        columnWidth: 100,
        columnFormat: null
      }
    ];

    this.quotationGrid.rowLists = [
      {id: 1, qno: 'ab120', description: 'kdjndcjzka', expirydate: '2020-10-10', createddate: '2020-07-23', pdf: ''},
      {id: 2, qno: 'dc234', description: 'asnxakkkj', expirydate: '20202-11-11', createddate: '2020-07-23', pdf: ''},
      {id: 3, qno: 'sd256', description: 'akjsxnkxn', expirydate: '2020-12-12', createddate: '2020-07-23', pdf: ''},
    ];
  }

  viewForm() {
    this.display = true;
  }


  onUpload(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.quatationForm.patchValue({
        pdf: file
      });
    }
  }

  saveQuatation() {
    console.log(this.quatationForm.value);
    if (this.quatationForm.invalid) {
      this.formvalidationhelpers.validateAllFormFields(this.quatationForm);
      return;
    } else if (this.quatationForm.invalid) {
      this.customerservice.addQuatation(this.quatationForm.value, this.quatation.customerId).subscribe(
        respond => {
          /**/
        });
    }
  }

  get description() {
    return this.quatationForm.get('description');
  }

  get quatationNo() {
    return this.quatationForm.get('quatationNo');
  }

  get expiryDate() {
    return this.quatationForm.get('expiryDate');
  }

}
