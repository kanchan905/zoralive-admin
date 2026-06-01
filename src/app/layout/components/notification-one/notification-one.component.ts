import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../core/services/notification.service';
import { NOTIFICATION_USER_OPTIONS } from '../notification-user-options.constants';

@Component({
  selector: 'app-notification-one',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './notification-one.component.html',
  styleUrl: './notification-one.component.scss',
})
export class NotificationOneComponent {
  private readonly dialogRef = inject(MatDialogRef<NotificationOneComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly notify = inject(NotificationService);

  readonly userOptions = NOTIFICATION_USER_OPTIONS;
  readonly selectedFileName = signal('No file chosen');

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    whichUser: ['all', Validators.required],
  });

  close(): void {
    this.dialogRef.close();
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.selectedFileName.set(file?.name ?? 'No file chosen');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.warning('Please fill out all required fields');
      return;
    }

    // TODO: POST push notification API
    this.notify.success('Notification sent successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
