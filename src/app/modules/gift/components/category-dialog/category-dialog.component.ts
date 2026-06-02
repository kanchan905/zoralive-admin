import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-category-dialog',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss',
})
export class CategoryDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<CategoryDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly notify = inject(NotificationService);

  readonly imageName = signal('No file chosen');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    isTop: [false],
  });

  close(): void {
    this.dialogRef.close();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.imageName.set(file ? file.name : 'No file chosen');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.warning('Please fill out all required fields');
      return;
    }

    this.notify.success('Category added successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
