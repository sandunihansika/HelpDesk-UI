import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InqueryTableComponent } from "./inquery-table/inquery-table.component";
import { QuatationModule } from "./inquery-table/quatation/quatation.module";
import { CustomerDetailsModule } from "./customer-details/customer-details.module";
import { SharedModule } from "../../../shared/shared.module";
import { InqueryRoutingModule } from "./inquery-routing.module";
import { CustomerTableModule } from "./customer-table/customer-table.module";
import { RadioButtonModule } from "primeng/radiobutton";
import { FormsModule } from "@angular/forms";
import {CustomerHandlingComponent} from './inquery-table/customer-handling/customer-handling.component';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CustomerDetailsComponent} from './customer-details/customer-details/customer-details.component';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
@NgModule({
  declarations: [InqueryTableComponent, CustomerHandlingComponent],
  imports: [
    CommonModule,
    CustomerDetailsModule,
    QuatationModule,
    CustomerDetailsModule,
    InqueryRoutingModule,
    CustomerTableModule,
    RadioButtonModule,
    FormsModule,
    MatDialogModule,
    FormsModule,
    MatDialogModule,
    SharedModule,
  ],
  exports: [InqueryTableComponent],
  entryComponents:[],
  providers: [CustomerHandlingComponent,{
    provide: MatDialogRef,
    useValue: {}
  },],
})
export class InqueryModule {
}
