import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdDate: string;
}
