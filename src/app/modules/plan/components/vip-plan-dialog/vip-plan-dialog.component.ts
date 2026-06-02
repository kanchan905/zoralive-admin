import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-vip-plan-dialog',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './vip-plan-dialog.component.html',
  styleUrl: './vip-plan-dialog.component.scss',
})
export class VipPlanDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<VipPlanDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly notify = inject(NotificationService);

  readonly optionList = [
    { value: '', label: 'Select' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  readonly form = this.fb.nonNullable.group({
    time: [1, [Validators.required, Validators.min(1)]],
    option: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    discount: [0, [Validators.required, Validators.min(0)]],
    productId: ['', [Validators.required, Validators.maxLength(120)]],
  });

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.warning('Please fill out all required fields');
      return;
    }

    this.notify.success('VIP plan added successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
