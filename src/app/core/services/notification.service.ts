import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

/** @deprecated Use ToastService instead. */
@Injectable({ providedIn: 'root' })
export class NotificationService extends ToastService {}
