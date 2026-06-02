import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-country-dialog',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './country-dialog.component.html',
  styleUrl: './country-dialog.component.scss',
})
export class CountryDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<CountryDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly notify = inject(NotificationService);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
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

    this.notify.success('Country added successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
