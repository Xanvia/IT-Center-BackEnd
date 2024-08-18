import { ChildEntity, Column } from 'typeorm';
import { User } from '../user.entity';
import { Role } from 'enums/role.enum';

@ChildEntity(Role.R_USER)
export class RegisteredUser extends User {
  @Column()
  size: string;
}
