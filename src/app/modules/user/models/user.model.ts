export type UserStatus = 'active' | 'inactive' | 'blocked' | string;

export interface PlatformUser {
  id?: number;
  image?: string;
  name: string;
  status: UserStatus;
  userId: string;
  coin?: number | string;
  followers?: number | string;
  following?: number | string;
  country?: string;
  loginType?: string;
  uniqueField?: string;
  lastLogin?: string;
  arrivedOn?: string;
  isBlock?: boolean;
}
