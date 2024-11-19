import {
  ChildEntity,
  Column,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from 'enums/role.enum';
import { StudentProfile } from 'src/profile/student-profile/entities/studentProfile.entity';
import { RegistrationRecord } from 'src/registration-records/entities/registration-record.entity';

@ChildEntity(Role.STUDENT)
export class Student extends User {
  @Generated('increment')
  sId: string;

  get studentId(): string {
    return `ITC${String(this.id).padStart(5, '0')}`;
  }

  @OneToOne(() => StudentProfile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  studentProfile: StudentProfile;

  @OneToMany(() => RegistrationRecord, (record) => record.student, {
    onUpdate: 'CASCADE',
  })
  registrationRecords: RegistrationRecord[];
}
