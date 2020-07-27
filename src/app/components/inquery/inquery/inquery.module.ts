import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InqueryTableComponent } from './inquery-table/inquery-table.component';
import { CustomerDetailsModule } from './customer-details/customer-details.module';
import { SharedModule } from '../../../shared/shared.module';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [InqueryTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    DialogModule
  ]
})
export class InqueryModule { }
