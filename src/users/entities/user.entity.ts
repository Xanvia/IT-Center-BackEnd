import { Role } from 'enums/role.enum';
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

  @Column()
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
  image: string;

  @CreateDateColumn()
  createdDate: string;

  @OneToMany(() => ReserveRecord, (record) => record.reservation)
  reserveRecords: ReserveRecord[];
}

// Single Table Inheritance (STI) is used
// Seperated table are used inOrder to reduce null values
