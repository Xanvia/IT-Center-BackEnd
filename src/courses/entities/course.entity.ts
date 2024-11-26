import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CourseImage } from './courseImage.entity';
import { RegistrationRecord } from 'src/registration-records/entities/registration-record.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseName: string;

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
    eager: true,
  })
  images: CourseImage[];

  @Column()
  studentLimit: number;

  @Column({ default: 0 })
  registered: number;

  @Column({ type: 'date' })
  startingDate: Date;

  @Column({ type: 'date' })
  endingDate: Date;

  @OneToMany(() => RegistrationRecord, (record) => record.course, {
    onUpdate: 'CASCADE',
  })
  registrationRecords: RegistrationRecord[];
}
