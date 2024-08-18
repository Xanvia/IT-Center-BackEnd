import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { StudentProfile } from './profile.entity';

@Entity()
export class Employment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  institution: string;

  @Column()
  designation: string;

  @Column({ nullable: true })
  officeAddress: string;

  @Column({ nullable: true })
  officePhone: string;

  @OneToOne(() => StudentProfile, (profile) => profile.education, {
    cascade: true,
  })
  profile: StudentProfile;
}
