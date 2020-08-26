import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-common-confirm-box',
  templateUrl: './common-confirm-box.component.html',
  styleUrls: ['./common-confirm-box.component.scss']
})
export class CommonConfirmBoxComponent implements OnInit {
  dialogMessage: string;

  constructor(protected ref: MatDialogRef<CommonConfirmBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.data ? this.dialogMessage = this.data.dialogMessage : this.dialogMessage = 'Are you sure?';
  }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(true);
  }

}
