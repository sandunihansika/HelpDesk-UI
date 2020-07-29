import {Component, OnInit} from '@angular/core';
import {Quatation} from './quatation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TextBoxTypes} from '../../../../../../shared/services/common/enum';
import {FormValidationHelpers} from '../../../../../../shared/helpers/form-validation-helpers';
import {CustomerDetailsService} from '../../../../../../shared/services/customer-details.service';


@Component({
  selector: 'app-quatation',
  templateUrl: './quatation.component.html',
  styleUrls: ['./quatation.component.scss']
})
export class QuatationComponent implements OnInit {
  quatationForm: FormGroup;
  quatation: Quatation;
  TextBoxTypes: typeof TextBoxTypes = TextBoxTypes;
  uploadedFiles: any[] = [];


  constructor(
    private formbuilder: FormBuilder,
    private formvalidationhelpers: FormValidationHelpers,
    private customerservice: CustomerDetailsService
  ) {
  }

  ngOnInit(): void {
    this.quatationForm = this.formbuilder.group({
      CustomerID: ['', Validators.required],
      Description: ['', [Validators.required]],
      QuatationNo: ['', [Validators.required]],
      ExpiryDate: ['', [Validators.required]],
      pdf: ['', [Validators.required]]
    });
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
