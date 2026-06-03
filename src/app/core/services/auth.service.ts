import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MOCK_USERS } from '../constants/mock-users.constants';
import { AuthUser, LoginCredentials, LoginResult, UserRole } from '../models/auth-user.model';

const SESSION_KEY = 'zora_auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly currentUser = signal<AuthUser | null>(this.readStoredUser());

  constructor() {
    this.currentUser.set(this.readStoredUser());
  }

  user() {
    return this.currentUser.asReadonly();
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  isAgency(): boolean {
    return this.currentUser()?.role === 'agency';
  }

  getDefaultRoute(): string {
    return '/dashboard';
  }

  getAgencyId(): string | undefined {
    if (!this.isAgency()) {
      return undefined;
    }
    return this.currentUser()?.agencyId ?? this.currentUser()?.id;
  }

  getAgencyCode(): string | undefined {
    return this.isAgency() ? this.currentUser()?.agencyCode : undefined;
  }

  login(credentials: LoginCredentials): LoginResult {
    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    const match = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email && u.password === password
    );

    if (!match) {
      return { success: false, message: 'Invalid email or password.' };
    }

    const { password: _pw, ...user } = match;
    this.persistUser(user);
    this.currentUser.set(user);

    return { success: true };
  }

  async loginAndNavigate(credentials: LoginCredentials): Promise<LoginResult> {
    const result = this.login(credentials);
    if (!result.success) {
      return result;
    }

    await this.router.navigateByUrl(this.getDefaultRoute(), { replaceUrl: true });
    return result;
  }

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

    await this.logout();
  }

  async logout(): Promise<void> {
    this.clearSession();

    await Swal.fire({
      title: 'Logged out',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonColor: '#6d5df6',
      timer: 1200,
      showConfirmButton: false,
    });

    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  private persistUser(user: AuthUser): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  private readStoredUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as AuthUser;
      if (parsed.role === 'admin' || parsed.role === 'agency') {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }

  private clearSession(): void {
    this.currentUser.set(null);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.clear();
  }
}
