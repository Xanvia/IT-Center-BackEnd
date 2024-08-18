import { Role } from 'enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  // @Column({ type: 'enum', enum: Role, default: Role.STUDENT })
  // role: Role;

  @Column()
  hashedPassword: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @CreateDateColumn()
  createdDate: string;

  // @OneToMany(() => Notification, (notification) => notification.user)
  // photos: Notification[]
}
