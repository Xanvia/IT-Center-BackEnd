import { ChildEntity, Column } from 'typeorm';
import { User } from '../user.entity';

@ChildEntity()
export class Staff extends User {
  @Column()
  size: string;
}
