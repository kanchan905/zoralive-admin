import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

@Component({
  selector: 'app-banner-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, AppButtonComponent],
  templateUrl: './banner-dialog.component.html',
  styleUrl: './banner-dialog.component.scss',
})
export class BannerDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<BannerDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

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
      this.toast.warning('Please fill out all required fields');
      return;
    }

    this.toast.success('Banner added successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
