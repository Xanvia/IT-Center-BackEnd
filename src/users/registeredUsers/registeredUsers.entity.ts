import { ChildEntity, Column } from 'typeorm';
import { User } from '../user.entity';

@ChildEntity()
export class RegisteredUser extends User {
  @Column()
  size: string;
}
