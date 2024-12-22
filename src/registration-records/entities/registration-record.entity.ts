import { Grade } from 'enums/grade.enum';
import { Status } from 'enums/registration.enum';
import { Course } from 'src/courses/entities/course.entity';
import { Student } from 'src/users/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class RegistrationRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.registrationRecords, {
    onDelete: 'SET NULL',
  })
  student: Student;

  @ManyToOne(() => Course, (course) => course.registrationRecords, {
    onDelete: 'SET NULL',
  })
  course: Course;

  @Column({ type: 'date' })
  registrationDate: Date;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @Column({ type: 'enum', enum: Grade, default: Grade.NA })
  result: Grade;

  @Column({ type: 'date', nullable: true })
  paymentDate: Date;
}
