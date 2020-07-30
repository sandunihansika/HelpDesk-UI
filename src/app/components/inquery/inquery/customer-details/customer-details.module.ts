import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import {SharedModule} from '../../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {CorporateDetailsComponent} from './corporate-details/corporate-details.component';


@NgModule({
  declarations: [
    CustomerDetailsComponent,
    CorporateDetailsComponent
  ],
  exports: [
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CardModule
  ]
})
export class CustomerDetailsModule { }
