import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuatationComponent } from './quatation/quatation.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {CardModule} from 'primeng/card';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [QuatationComponent],
  imports: [
    CommonModule,
    SharedModule,
    CardModule,
    ReactiveFormsModule
  ]
})
export class QuatationModule { }
