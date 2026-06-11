import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { ToastService } from '../../../../core/services/toast.service';
import { OfflineRechargeService } from '../../services/offline-recharge.service';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

@Component({
  selector: 'app-offline-recharge',
  imports: [ReactiveFormsModule, BreadcrumbComponent, PageHeaderComponent, AppButtonComponent],
  templateUrl: './offline-recharge.component.html',
  styleUrl: './offline-recharge.component.scss',
})
export class OfflineRechargeComponent {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly offlineRechargeService = inject(OfflineRechargeService);

  readonly submitting = signal(false);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'User' },
    { label: 'Offline Recharge' },
  ];

  readonly form = this.fb.nonNullable.group({
    userName: ['', [Validators.required, Validators.maxLength(120)]],
    coin: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.warning('Please fill all required fields');
      return;
    }

    const payload = this.form.getRawValue();
    this.submitting.set(true);

    this.offlineRechargeService
      .recharge({
        userName: payload.userName.trim(),
        coin: Number(payload.coin),
      })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (res) => {
          this.toast.apiSuccess(res, 'Offline recharge submitted successfully');
          this.form.reset({ userName: '', coin: null });
        },
      });
  }
}
