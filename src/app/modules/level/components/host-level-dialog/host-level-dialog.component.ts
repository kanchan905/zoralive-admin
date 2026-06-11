import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

@Component({
  selector: 'app-host-level-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, AppButtonComponent],
  templateUrl: './host-level-dialog.component.html',
  styleUrl: './host-level-dialog.component.scss',
})
export class HostLevelDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<HostLevelDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    coin: [null as number | null, [Validators.required, Validators.min(0)]],
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

    this.toast.success('Host level added successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
