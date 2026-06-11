import { AuthUser } from '../models/auth-user.model';

export const MOCK_USERS: Array<AuthUser & { password: string }> = [
  {
    id: '1',
    email: 'admin@bolnet.com',
    password: 'admin123',
    name: 'Admin',
    role: 'admin',
    avatarUrl: 'assets/admin-avatar.png',
  },
  {
    id: '2',
    email: 'agency@bolnet.com',
    password: 'agency123',
    name: 'BolNet Agency',
    role: 'agency',
    agencyId: '2',
    agencyCode: 'AG-1024',
    avatarUrl: 'assets/admin-avatar.png',
  },
];
