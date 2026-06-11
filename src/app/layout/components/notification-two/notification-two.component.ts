import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../core/services/toast.service';
import { NOTIFICATION_USER_OPTIONS } from '../notification-user-options.constants';
import { AppButtonComponent } from '../../../layout/components/button/button.component';
import { AppSelectComponent } from '../../../layout/components/select/select.component';

@Component({
  selector: 'app-notification-two',
  imports: [ReactiveFormsModule, MatDialogModule, AppButtonComponent, AppSelectComponent],
  templateUrl: './notification-two.component.html',
  styleUrl: './notification-two.component.scss',
})
export class NotificationTwoComponent {
  private readonly dialogRef = inject(MatDialogRef<NotificationTwoComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  readonly userOptions = NOTIFICATION_USER_OPTIONS;

  readonly form = this.fb.nonNullable.group({
    message: ['', Validators.required],
    whichUser: ['all', Validators.required],
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

    // TODO: POST message-to-users API
    this.toast.success('Message sent successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
