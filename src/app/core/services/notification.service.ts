import { Injectable, inject } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly toastr = inject(ToastrService);

  private readonly baseConfig: Partial<IndividualConfig> = {
    timeOut: 4000,
    closeButton: true,
    progressBar: true,
    tapToDismiss: true,
    enableHtml: false,
  };

  success(message: string, title = 'Success'): void {
    this.show('success', message, title);
  }

  error(message: string, title = 'Error'): void {
    this.show('error', message, title);
  }

  info(message: string, title = 'Info'): void {
    this.show('info', message, title);
  }

  warning(message: string, title = 'Warning'): void {
    this.show('warning', message, title);
  }

  private show(type: ToastType, message: string, title: string): void {
    const toastClass = `zora-toast zora-toast-${type}`;
    const config = { ...this.baseConfig, toastClass };

    switch (type) {
      case 'success':
        this.toastr.success(message, title, config);
        break;
      case 'error':
        this.toastr.error(message, title, config);
        break;
      case 'info':
        this.toastr.info(message, title, config);
        break;
      case 'warning':
        this.toastr.warning(message, title, config);
        break;
    }
  }
}
