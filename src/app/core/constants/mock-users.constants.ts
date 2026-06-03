import { AuthUser } from '../models/auth-user.model';

export const MOCK_USERS: Array<AuthUser & { password: string }> = [
  {
    id: '1',
    email: 'admin@zoralive.com',
    password: 'admin123',
    name: 'Admin',
    role: 'admin',
    avatarUrl: 'assets/admin-avatar.png',
  },
  {
    id: '2',
    email: 'agency@zora.com',
    password: 'agency123',
    name: 'Zora Agency',
    role: 'agency',
    agencyId: '2',
    agencyCode: 'AG-1024',
    avatarUrl: 'assets/admin-avatar.png',
  },
];
