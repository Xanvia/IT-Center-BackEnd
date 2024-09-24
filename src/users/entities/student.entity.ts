import { ChildEntity, Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'enums/role.enum';
import { StudentProfile } from 'src/profile/student-profile/entities/profile.entity';

@ChildEntity(Role.STUDENT)
export class Student extends User {
  @OneToOne(() => StudentProfile, (profile) => profile.user)
  @JoinColumn()
  profile: StudentProfile;
}
