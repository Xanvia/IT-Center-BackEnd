import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StaffProfile } from './StaffProfile.entity';

@Entity()
export class Telephone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => StaffProfile, (parent) => parent.telephones, {
    onDelete: 'CASCADE',
  })
  profile: StaffProfile;
}
