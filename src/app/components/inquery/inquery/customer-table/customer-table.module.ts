import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { MatTabsModule} from '@angular/material/tabs';
import { CardModule } from 'primeng/card';
import {CustomerDetailsModule} from '../customer-details/customer-details.module';

@NgModule({
  declarations: [CustomerTableComponent],
    imports: [
        CommonModule,
        SharedModule,
        DialogModule,
        MatTabsModule,
        CardModule,
        CustomerDetailsModule
    ]
})
export class CustomerTableModule { }
