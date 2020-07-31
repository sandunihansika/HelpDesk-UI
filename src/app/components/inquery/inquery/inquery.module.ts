import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InqueryTableComponent} from './inquery-table/inquery-table.component';
import {CustomerHandlingComponent} from './inquery-table/customer-handling/customer-handling.component';
import {QuatationModule} from './inquery-table/quatation/quatation.module';
import {CustomerDetailsModule} from './customer-details/customer-details.module';
import {SharedModule} from '../../../shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import {InqueryRoutingModule} from './inquery-routing.module';
import {CustomerTableModule} from './customer-table/customer-table.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CustomerDetailsComponent} from './customer-details/customer-details/customer-details.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [InqueryTableComponent, CustomerHandlingComponent],
  imports: [
    CommonModule,
    CustomerDetailsModule,
    QuatationModule,
    CommonModule,
    SharedModule,
    DialogModule,
    CustomerDetailsModule,
    InqueryRoutingModule,
    CustomerTableModule,
    RadioButtonModule,
    FormsModule
  ],
  exports: [InqueryTableComponent, CustomerHandlingComponent]
})
export class InqueryModule {
}
