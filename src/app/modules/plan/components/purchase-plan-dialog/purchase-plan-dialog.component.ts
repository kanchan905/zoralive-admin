import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

@Component({
  selector: 'app-purchase-plan-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, AppButtonComponent],
  templateUrl: './purchase-plan-dialog.component.html',
  styleUrl: './purchase-plan-dialog.component.scss',
})
export class PurchasePlanDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<PurchasePlanDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  readonly form = this.fb.nonNullable.group({
    coin: [0, [Validators.required, Validators.min(0)]],
    rupee: [0, [Validators.required, Validators.min(0)]],
    productId: ['', [Validators.required, Validators.maxLength(120)]],
  });

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.warning('Please fill out all required fields');
      return;
    }

    this.toast.success('Purchase plan added successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
