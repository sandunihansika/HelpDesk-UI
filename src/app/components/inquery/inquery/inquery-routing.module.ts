import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InqueryTableComponent } from './inquery-table/inquery-table.component';
import {QuatationComponent} from './inquery-table/quatation/quatation/quatation.component';
import {CustomerTableComponent} from './customer-table/customer-table/customer-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InqueryTableComponent,
        data: {
          title: "Inquiry",
          breadcrumb: ""
        },
      },
      {
        path: 'quotation/:customerId',
        component: QuatationComponent,
        data: {
          title: "Quotation",
          breadcrumb: "Quotation"
        },
      },
      {
        path: 'customer',
        component: CustomerTableComponent,
        data: {
          title: "Customer",
          breadcrumb: "Customer"
        },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InqueryRoutingModule { }
