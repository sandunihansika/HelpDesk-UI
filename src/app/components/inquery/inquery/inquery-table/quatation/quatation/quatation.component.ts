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

  addAllow1 = true;
  showToolBar1 = true;
  showSearchBox1 = true;
  quatationForm: FormGroup;
  quatation: Quatation;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  uploadedFiles: any[] = [];

  display: boolean = false;
  data: any[];

  constructor(
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private customerservice: CustomerDetailsService
  ) {
  }

  ngOnInit(): void {
    this.quatationForm = this.formbuilder.group({
      Description: ['', [Validators.required]],
      QuatationNo: ['', [Validators.required]],
      ExpiryDate: ['', [Validators.required]],
    });

    this.data = this.customerservice.data;

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
      this.customerservice.addQuatation(this.quatationForm.value, this.quatation.CustomerID).subscribe(
        respond => {
          /**/
        });
    }
  }

  get Description() {
    return this.quatationForm.get('Description');
  }

  get QuatationNo() {
    return this.quatationForm.get('QuatationNo');
  }

  get ExpiryDate() {
    return this.quatationForm.get('ExpiryDate');
  }

}
