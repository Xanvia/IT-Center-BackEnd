import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { StudentProfile } from './studentProfile.entity';

@Entity()
export class Employment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  institution: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  officeAddress: string;

  @Column({ nullable: true })
  officePhone: string;

  @OneToOne(() => StudentProfile, (profile) => profile.employment)
  profile: StudentProfile;
}
