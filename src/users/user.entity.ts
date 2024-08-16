import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @Column()
  hashedRefreshToken: string;

  @CreateDateColumn()
  createdDate: string;
}
