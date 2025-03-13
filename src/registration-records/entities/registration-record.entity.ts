import { Grade } from 'enums/grade.enum';
import { Status } from 'enums/registration.enum';
import { Course } from 'src/courses/entities/course.entity';
import { Student } from 'src/users/entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@Index(['student', 'course'], { unique: true })
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

  @CreateDateColumn()
  registrationDate: Date;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @Column({ type: 'enum', enum: Grade, default: Grade.NA })
  result: Grade;

  @Column({ type: 'date', nullable: true })
  paymentDate: Date;

  @Column({ nullable: true })
  batch: string;
}
