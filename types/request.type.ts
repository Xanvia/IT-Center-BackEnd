import { Role } from 'enums/role.enum';

export interface URequrst extends Request {
  user: { id: string; role: Role };
}
