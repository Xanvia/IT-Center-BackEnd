import { Role } from 'enums/role.enum';

export interface TUser {
  id: string;
  email: string;
  hashedPassword: string;
  role: Role;
  hashedRefreshToken?: string;
}

// Access Roles
export const STAFF = [Role.ADMIN, Role.S_ADMIN, Role.STAFF];
export const ADMIN = [Role.ADMIN, Role.S_ADMIN];
export const S_ADMIN = [Role.S_ADMIN];
export const USER = [Role.USER];
export const STUDENT = [Role.STUDENT];
