import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Consultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  serviceType: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdDate: string;
}
