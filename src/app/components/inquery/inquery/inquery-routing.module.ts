import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InqueryTableComponent } from './inquery-table/inquery-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'quotation',
        component: InqueryTableComponent,
        data: {
          title: "Quotation",
          breadcrumb: "Quotation"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InqueryRoutingModule { }
