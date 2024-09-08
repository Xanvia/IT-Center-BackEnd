import { Role } from 'enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'enum', enum: Role, name: 'role' } })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.R_USER })
  public role: Role;

  @Column()
  hashedPassword: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdDate: string;
}

// Single Table Inheritance (STI) is used
// Seperated table are used inOrder to reduce null values
