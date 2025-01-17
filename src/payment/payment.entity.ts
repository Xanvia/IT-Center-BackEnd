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

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdDate: Date;
}
