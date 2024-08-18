import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StaffProfile } from './profile.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @ManyToOne(() => StaffProfile, (parent) => parent.emails)
  profile: StaffProfile;
}
