import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComplaintTableComponent} from './complaint-table/complaint-table.component';




const routes: Routes = [
  {
    path : '',
        component : ComplaintTableComponent,
        data: {
          title: "Complaint-table",
          breadcrumb: "Complaint-table"
        },
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintRoutingModule { }
