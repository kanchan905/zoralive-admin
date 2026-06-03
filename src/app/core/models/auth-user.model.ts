export type UserRole = 'admin' | 'agency';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  agencyId?: string;
  agencyCode?: string;
  avatarUrl?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  message?: string;
}
