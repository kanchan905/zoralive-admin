import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, BreadcrumbComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly fb = inject(FormBuilder);
  private readonly notify = inject(NotificationService);
  private readonly auth = inject(AuthService);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Profile' },
  ];

  readonly avatarUrl = signal('assets/admin-avatar.png');
  readonly editingProfile = signal(false);
  readonly showCurrentPassword = signal(false);
  readonly showNewPassword = signal(false);
  readonly showConfirmPassword = signal(false);

  readonly stats = {
    daysActive: '125',
    role: 'Super Admin',
    lastLogin: '15 Apr 2024',
  };

  readonly profileForm = this.fb.nonNullable.group({
    fullName: ['Admin User', [Validators.required, Validators.maxLength(120)]],
    email: ['admin@zoralive.com', [Validators.required, Validators.email]],
  });

  readonly passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  readonly accountOptions = [
    { icon: 'bi bi-person', label: 'Edit Profile Information', action: 'edit' as const },
    { icon: 'bi bi-lock', label: 'Change Password', action: 'password' as const },
    { icon: 'bi bi-activity', label: 'Account Activity', action: 'activity' as const },
    { icon: 'bi bi-box-arrow-right', label: 'Logout From All Devices', action: 'logout' as const },
  ];

  toggleEditProfile(): void {
    this.editingProfile.update((v) => !v);
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.notify.warning('Please fill out all required fields');
      return;
    }

    this.editingProfile.set(false);
    this.notify.success('Profile updated successfully');
  }

  updatePassword(): void {
    const { newPassword, confirmPassword } = this.passwordForm.getRawValue();

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      this.notify.warning('Please fill out all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      this.notify.error('New password and confirm password do not match');
      return;
    }

    this.passwordForm.reset();
    this.notify.success('Password updated successfully');
  }

  onAccountOption(action: 'edit' | 'password' | 'activity' | 'logout'): void {
    if (action === 'edit') {
      this.editingProfile.set(true);
      document.getElementById('user-info-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (action === 'password') {
      document.getElementById('change-password-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (action === 'activity') {
      this.notify.info('Account activity will be available soon');
      return;
    }

    void this.auth.logoutWithConfirm();
  }

  onAvatarSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.avatarUrl.set(reader.result);
        this.notify.success('Profile photo updated');
      }
    };
    reader.readAsDataURL(file);
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm'): void {
    if (field === 'current') {
      this.showCurrentPassword.update((v) => !v);
    } else if (field === 'new') {
      this.showNewPassword.update((v) => !v);
    } else {
      this.showConfirmPassword.update((v) => !v);
    }
  }
}
