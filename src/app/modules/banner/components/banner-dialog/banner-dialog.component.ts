import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-banner-dialog',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './banner-dialog.component.html',
  styleUrl: './banner-dialog.component.scss',
})
export class BannerDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<BannerDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly notify = inject(NotificationService);

  readonly fileName = signal('No file chosen');
  readonly form = this.fb.nonNullable.group({
    link: ['', [Validators.required, Validators.maxLength(300)]],
    image: ['', Validators.required],
  });

  close(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.fileName.set(file ? file.name : 'No file chosen');
    this.form.controls.image.setValue(file ? file.name : '');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.warning('Please fill out all required fields');
      return;
    }

    this.notify.success('Banner added successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
