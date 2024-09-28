import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StaffProfile } from './StaffProfile.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @ManyToOne(() => StaffProfile, (parent) => parent.emails)
  profile: StaffProfile;
}
