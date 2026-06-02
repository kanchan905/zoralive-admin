import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  async confirmLogout(): Promise<boolean> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#6d5df6',
      cancelButtonColor: '#9ca3af',
      reverseButtons: true,
      focusCancel: true,
    });

    return result.isConfirmed;
  }

  async logoutWithConfirm(): Promise<void> {
    const confirmed = await this.confirmLogout();
    if (!confirmed) {
      return;
    }

    this.clearSession();

    await Swal.fire({
      title: 'Logged out',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonColor: '#6d5df6',
      timer: 1200,
      showConfirmButton: false,
    });

    await this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    window.location.reload();
  }

  private clearSession(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
