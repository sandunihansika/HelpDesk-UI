import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuatationComponent } from "./quatation/quatation.component";
import { SharedModule } from "../../../../../shared/shared.module";
import { CardModule } from "primeng/card";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextareaModule } from "primeng/inputtextarea";
import { FileUploadModule } from "primeng/fileupload";
import { DialogModule } from "primeng/dialog";
import { QuotationFormComponent } from './quotation-form/quotation-form.component';

@NgModule({
  declarations: [QuatationComponent, QuotationFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    CardModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  exports: [
    QuatationComponent,
    ReactiveFormsModule,
    InputTextareaModule,
    FileUploadModule,
  ],
})
export class QuatationModule {}
