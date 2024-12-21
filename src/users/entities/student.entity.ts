import {
  ChildEntity,
  Column,
  DataSource,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from 'enums/role.enum';
import { StudentProfile } from 'src/profile/student-profile/entities/studentProfile.entity';
import { RegistrationRecord } from 'src/registration-records/entities/registration-record.entity';

@ChildEntity(Role.STUDENT)
export class Student extends User {
  @Column({ unique: true, length: 8 })
  studentId: string;

  // Method to generate the next formatted student ID
  static async getNextStudentId(dataSource: DataSource): Promise<string> {
    const result = await dataSource
      .createQueryBuilder()
      .select('studentId')
      .from(Student, 'student')
      .orderBy('studentId', 'DESC')
      .limit(1)
      .getRawOne();

    if (result.studentId === null) {
      return 'ITC0001';
    }

    const currentNumber = parseInt(result.studentId.replace('ITC', ''));
    const nextNumber = currentNumber + 1;
    return `ITC${nextNumber.toString().padStart(4, '0')}`;
  }

  @OneToOne(() => StudentProfile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  studentProfile: StudentProfile;

  @OneToMany(() => RegistrationRecord, (record) => record.student, {
    onUpdate: 'CASCADE',
  })
  registrationRecords: RegistrationRecord[];
}
