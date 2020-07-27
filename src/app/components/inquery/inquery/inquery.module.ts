import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InqueryTableComponent } from './inquery-table/inquery-table.component';
import {CustomerDetailsModule} from './customer-details/customer-details.module';


@NgModule({
  declarations: [InqueryTableComponent],
  imports: [
    CommonModule
  ]
})
export class InqueryModule { }
