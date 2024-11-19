import { Grade } from 'enums/grade.enum';
import { Status } from 'enums/registration.enum';
import { Course } from 'src/courses/entities/course.entity';
import { Student } from 'src/users/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class RegistrationRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.registrationRecords)
  student: Student;

  @ManyToOne(() => Course, (course) => course.registrationRecords)
  course: Course;

  @Column({ type: 'date' })
  registrationDate: Date;

  @Column({ type: 'enum', enum: Status, default: Status.NOTPAID })
  status: boolean;

  @Column({ type: 'enum', enum: Grade, default: Grade.NA })
  result: Grade;

  @Column({ type: 'date', nullable: true })
  paymentDate: Date;
}
