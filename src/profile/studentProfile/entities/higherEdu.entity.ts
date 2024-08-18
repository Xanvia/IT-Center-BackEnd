import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StudentProfile } from './profile.entity';

@Entity()
export class HigherEdu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  FOQualification: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  institute: string;

  @ManyToOne(() => StudentProfile, (parent) => parent.higherEdu)
  user: StudentProfile;
}
