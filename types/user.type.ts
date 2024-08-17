import { Role } from 'enums/role.enum';

export interface TUser {
  id: string;
  email: string;
  role: Role;
  hashedRefreshToken?: string;
}
