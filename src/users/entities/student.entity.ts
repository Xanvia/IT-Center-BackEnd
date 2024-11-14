import { ChildEntity, Column, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'enums/role.enum';
import { StudentProfile } from 'src/profile/student-profile/entities/studentProfile.entity';
import { RegistrationRecord } from 'src/registration-records/entities/registration-record.entity';

@ChildEntity(Role.STUDENT)
export class Student extends User {
  @Column()
  studentId: string;

  @OneToOne(() => StudentProfile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: StudentProfile;

  @OneToMany(() => RegistrationRecord, (record) => record.student, {
    onUpdate: 'CASCADE',
  })
  registrationRecords: RegistrationRecord[];
}
