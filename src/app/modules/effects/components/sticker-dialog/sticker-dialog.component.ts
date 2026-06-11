import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

@Component({
  selector: 'app-sticker-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, AppButtonComponent],
  templateUrl: './sticker-dialog.component.html',
  styleUrl: './sticker-dialog.component.scss',
})
export class StickerDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<StickerDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  readonly fileName = signal('No file chosen');
  readonly form = this.fb.nonNullable.group({
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
      this.toast.warning('Please upload sticker icon');
      return;
    }

    this.toast.success('Sticker added successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
