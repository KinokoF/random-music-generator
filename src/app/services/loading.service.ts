import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private ref: MatDialogRef<LoadingDialogComponent> | undefined;

  constructor(private dialog: MatDialog) {}

  show(message?: string): void {
    if (!this.ref) {
      this.ref = this.dialog.open(LoadingDialogComponent, {
        disableClose: true,
        panelClass: 'transparent-dialog',
        data: message
      });
    }
  }

  hide(): void {
    this.ref?.close();
    this.ref = undefined;
  }
}
