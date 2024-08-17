import { Role } from 'enums/role.enum';

export interface TPayload {
  sub: string;
  role: Role;
}
