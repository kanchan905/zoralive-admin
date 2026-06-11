import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';
import { AppSelectComponent } from '../../../../layout/components/select/select.component';

@Component({
  selector: 'app-gift-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, AppButtonComponent, AppSelectComponent],
  templateUrl: './gift-dialog.component.html',
  styleUrl: './gift-dialog.component.scss',
})
export class GiftDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<GiftDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  readonly iconName = signal('No file chosen');
  readonly categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: '1', label: 'Category 1' },
    { value: '2', label: 'Category 2' },
  ];

  readonly form = this.fb.nonNullable.group({
    coin: [0, [Validators.required, Validators.min(0)]],
    categoryId: ['', Validators.required],
  });

  close(): void {
    this.dialogRef.close();
  }

  onIconSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.iconName.set(file ? file.name : 'No file chosen');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.warning('Please fill out all required fields');
      return;
    }

    this.toast.success('Gift added successfully');
    this.dialogRef.close(this.form.getRawValue());
  }
}
