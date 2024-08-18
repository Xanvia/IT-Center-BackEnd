import { ChildEntity, Column } from 'typeorm';
import { User } from '../user.entity';
import { StudentProfile } from 'src/profile/studentProfile/entities/profile.entity';
import { Role } from 'enums/role.enum';

@ChildEntity(Role.STUDENT)
export class Student extends User {
  @Column()
  profile: StudentProfile;
}
