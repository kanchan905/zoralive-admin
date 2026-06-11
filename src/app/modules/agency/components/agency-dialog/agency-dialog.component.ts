import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';
import { AppSelectComponent } from '../../../../layout/components/select/select.component';

const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Brazil',
  'Mexico',
];

@Component({
  selector: 'app-agency-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, AppButtonComponent, AppSelectComponent],
  templateUrl: './agency-dialog.component.html',
  styleUrl: './agency-dialog.component.scss',
})
export class AgencyDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<AgencyDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  readonly countries = COUNTRIES;
  readonly showPassword = signal(false);
  readonly imagePreview = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    country: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    password: ['', Validators.required],
    code: ['', Validators.required],
  });

  close(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  autoGeneratePassword(): void {
    this.form.patchValue({ password: this.randomString(10) });
  }

  autoGenerateCode(): void {
    this.form.patchValue({ code: `AG-${this.randomString(6).toUpperCase()}` });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.imagePreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.toast.success('Agency created successfully');
    this.dialogRef.close(this.form.getRawValue());
  }

  private randomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }
}
