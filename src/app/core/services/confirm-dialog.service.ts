import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../../layout/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../models/confirm-dialog.model';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private readonly dialog = inject(MatDialog);

  confirm(options: ConfirmDialogData): Promise<boolean> {
    const data: Required<ConfirmDialogData> = {
      message: '',
      type: 'warning',
      confirmText: 'Yes',
      cancelText: 'Cancel',
      showCancel: true,
      ...options,
    };

    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      maxWidth: '95vw',
      panelClass: 'confirm-dialog-panel',
      autoFocus: 'first-titled-element',
      disableClose: true,
      data,
    });

    return firstValueFrom(ref.afterClosed()).then((result) => !!result);
  }
}
