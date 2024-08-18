import { Role } from 'enums/role.enum';

export interface TUser {
  id: string;
  email: string;
  hashedPassword: string;
  role: Role;
  hashedRefreshToken?: string;
}
