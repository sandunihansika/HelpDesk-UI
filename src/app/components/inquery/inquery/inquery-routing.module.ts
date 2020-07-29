import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InqueryTableComponent } from './inquery-table/inquery-table.component';
import {QuatationComponent} from './inquery-table/quatation/quatation/quatation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InqueryTableComponent,
        data: {
          title: "Inquiry",
          breadcrumb: "Inquiry"
        },

      },
      {
        path: 'quotation',
        component: QuatationComponent,
        data: {
          title: "Quotation",
          breadcrumb: "Quotation"
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
