import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column({ default: false })
  isRead: boolean;
}
