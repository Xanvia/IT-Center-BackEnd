import { Role } from 'enums/role.enum';
import { Notification } from 'src/notifications/entities/notification.entity';
import { ReserveRecord } from 'src/reserve-records/entities/reserve-record.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({
  column: { type: 'enum', enum: Role, name: 'role' },
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Role })
  public role: Role;

  @Column()
  hashedPassword: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdDate: string;

  @OneToMany(() => ReserveRecord, (record) => record.user, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  reserveRecords: ReserveRecord[];

  @OneToMany(() => Notification, (record) => record.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  notifications: Notification[];
}

// Single Table Inheritance (STI) is used
// Seperated table are used inOrder to reduce null values
