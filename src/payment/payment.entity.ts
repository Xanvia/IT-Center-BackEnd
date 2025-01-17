import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  referenceId: string;

  @Column()
  subject: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  success: boolean;

  @CreateDateColumn()
  createdDate: Date;
}
