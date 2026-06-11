import { Injectable, inject } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { extractApiMessage } from '../utils/api-message.util';

type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastr = inject(ToastrService);

  private readonly baseConfig: Partial<IndividualConfig> = {
    timeOut: 4000,
    closeButton: true,
    progressBar: true,
    tapToDismiss: true,
    enableHtml: false,
    toastClass: 'app-toast',
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

  apiSuccess(response: unknown, fallback = 'Operation completed successfully.', title = 'Success'): void {
    this.success(extractApiMessage(response, fallback), title);
  }

  apiError(error: unknown, fallback = 'Something went wrong. Please try again.', title = 'Error'): void {
    this.error(extractApiMessage(error, fallback), title);
  }

  private show(type: ToastType, message: string, title: string): void {
    const config = { ...this.baseConfig };

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
