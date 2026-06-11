import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData, ConfirmDialogType } from '../../../core/models/confirm-dialog.model';
import { AppButtonComponent } from '../button/button.component';

const ICONS: Record<ConfirmDialogType, string> = {
  warning: 'bi-exclamation-triangle-fill',
  danger: 'bi-exclamation-octagon-fill',
  info: 'bi-info-circle-fill',
  success: 'bi-check-circle-fill',
};

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, AppButtonComponent],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent, boolean>);
  readonly data = inject<Required<ConfirmDialogData>>(MAT_DIALOG_DATA);

  readonly iconClass = ICONS[this.data.type];

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
