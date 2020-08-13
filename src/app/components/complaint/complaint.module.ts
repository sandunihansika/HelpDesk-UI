import {NgModule, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComplaintTableComponent} from './complaint-table/complaint-table.component';
import {ComplaintRoutingModule} from './complaint-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {CommonGridComponent} from '../../shared/components/common-grid/common-grid.component';
import {DialogModule} from 'primeng/dialog';
import {InqueryModule} from '../inquery/inquery/inquery.module';
import {ComplaintFormComponent} from './complaint-form/complaint-form.component';
import {CustomerDetailsModule} from '../inquery/inquery/customer-details/customer-details.module';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations : [
    ComplaintTableComponent,
    ComplaintFormComponent,


  ],
    imports: [
        ComplaintRoutingModule,
        SharedModule,
        DialogModule,
        InqueryModule,
        CommonModule,
        CustomerDetailsModule,
        ButtonModule
    ],
  providers : [],
  exports : []

})

export class ComplaintModule{





}
