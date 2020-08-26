import { CommonConfirmBoxComponent } from './common-confirm-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonConfirmBoxHelper {
  constructor(public dialog: MatDialog) {}

  saveConfirmation(callBackYes: () => void, callBackNo?: () => void) {
    const dialogRef = this.dialog.open(CommonConfirmBoxComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        isAlertDialog: false,
        dialogMessage: 'Do you want to save?'
      },
      panelClass: 'no-padding-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callBackYes();
      } else {
        if (callBackNo) {
          callBackNo();
        }
      }
    });
  }

  closeConfirmation(callBackYes: () => void, callBackNo?: () => void) {
    const dialogRef = this.dialog.open(CommonConfirmBoxComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        isAlertDialog: false,
        dialogMessage: 'Do you want to close?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callBackYes();
      } else {
        if (callBackNo) {
          callBackNo();
        }
      }
    });
  }

  customConfirmation(callBackYes: () => void, message: string, callBackNo?: () => void) {
    const dialogRef = this.dialog.open(CommonConfirmBoxComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        isAlertDialog: false,
        dialogMessage: message
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callBackYes();
      } else {
        if (callBackNo) {
          callBackNo();
        }
      }
    });
  }

}
