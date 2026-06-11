import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

@Component({
  selector: 'app-emoji-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, AppButtonComponent],
  templateUrl: './emoji-dialog.component.html',
  styleUrl: './emoji-dialog.component.scss',
})
export class EmojiDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<EmojiDialogComponent>);
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
      this.toast.warning('Please upload emoji icon');
      return;
    }

    this.toast.success('Emoji added successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
