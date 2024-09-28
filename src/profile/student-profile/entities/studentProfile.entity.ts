import { Title } from 'enums/title.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Education } from './education.entity';
import { HigherEdu } from './higherEdu.entity';
import { Employment } from './employment.entity';
import { Profile } from 'src/profile/entity/profile.entity';
import { Student } from 'src/users/entities/student.entity';

@Entity()
export class StudentProfile extends Profile {
  @Column()
  fullName: string;

  @Column()
  nameWithIntials: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  otherQualification: string;

  @CreateDateColumn()
  createdDate: string;

  // Table Relationships

  @OneToOne(() => Education, (education) => education.profile)
  @JoinColumn()
  education: Education;

  @OneToMany(() => HigherEdu, (item) => item.user, {
    cascade: true,
    eager: true,
  })
  higherEdu: HigherEdu[];

  @OneToOne(() => Employment, (employment) => employment.profile)
  @JoinColumn()
  employment: Employment;

  @OneToOne(() => Student, (user) => user.profile)
  @JoinColumn()
  user: Student;
}
