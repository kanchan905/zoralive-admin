export type ConfirmDialogType = 'warning' | 'danger' | 'info' | 'success';

export interface ConfirmDialogData {
  title: string;
  message?: string;
  type?: ConfirmDialogType;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}
