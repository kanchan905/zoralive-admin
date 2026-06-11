import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import {
  FAKE_HOST_AGENCY_OPTIONS,
  HostAddMode,
} from '../../constants/fake-host-dialog.constants';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';
import { AppSelectComponent } from '../../../../layout/components/select/select.component';

@Component({
  selector: 'app-fake-host-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, AppButtonComponent, AppSelectComponent],
  templateUrl: './fake-host-dialog.component.html',
  styleUrl: './fake-host-dialog.component.scss',
})
export class FakeHostDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<FakeHostDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  readonly agencyOptions = FAKE_HOST_AGENCY_OPTIONS;
  readonly hostMode = signal<HostAddMode>('single');
  readonly showPassword = signal(false);
  readonly imageFileName = signal('No file chosen');
  readonly videoFileName = signal('No file chosen');

  readonly singleForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    agency: ['', Validators.required],
    country: ['', Validators.required],
    bio: [''],
    password: ['', Validators.required],
  });

  readonly multipleForm = this.fb.nonNullable.group({
    agency: ['', Validators.required],
    country: ['', Validators.required],
  });

  setHostMode(mode: HostAddMode): void {
    this.hostMode.set(mode);
    this.imageFileName.set('No file chosen');
    this.videoFileName.set('No file chosen');
  }

  isSingle(): boolean {
    return this.hostMode() === 'single';
  }

  close(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) {
      this.imageFileName.set('No file chosen');
      return;
    }
    this.imageFileName.set(
      files.length === 1 ? files[0].name : `${files.length} files selected`
    );
  }

  onVideoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) {
      this.videoFileName.set('No file chosen');
      return;
    }
    this.videoFileName.set(
      files.length === 1 ? files[0].name : `${files.length} files selected`
    );
  }

  submit(): void {
    const form = this.isSingle() ? this.singleForm : this.multipleForm;

    if (form.invalid) {
      form.markAllAsTouched();
      this.toast.warning('Please fill out all required fields');
      return;
    }

    const message = this.isSingle()
      ? 'Fake host added successfully'
      : 'Fake hosts uploaded successfully';

    this.toast.success(message);
    this.dialogRef.close({
      mode: this.hostMode(),
      ...form.getRawValue(),
    });
  }
}
