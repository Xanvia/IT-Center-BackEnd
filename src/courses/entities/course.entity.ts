import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CourseImage } from './courseImage.entity';
import { RegistrationRecord } from 'src/registration-records/entities/registration-record.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseName: string;

  @Column({ unique: true })
  courseCode: string;

  @Column()
  description: string;

  @Column()
  duration: string;

  @Column()
  registrationDeadline: string;

  @Column('decimal')
  fees: number;

  @Column()
  audience: string;

  @Column({ nullable: true })
  @IsOptional()
  instructor: string;

  @OneToMany(() => CourseImage, (image) => image.course, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  images: CourseImage[];

  @Column()
  studentLimit: number;

  @Column({ default: 0 })
  registered: number;

  @Column({ type: 'timestamp' })
  startingDate: Date;

  @Column({ type: 'timestamp' })
  endingDate: Date;

  @OneToMany(() => RegistrationRecord, (record) => record.course, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  registrationRecords: RegistrationRecord[];
}
