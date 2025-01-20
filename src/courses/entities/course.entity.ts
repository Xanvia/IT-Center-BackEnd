import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @Column('simple-array')
  images: string[];

  @Column()
  studentLimit: number;

  @Column({ default: 0 })
  registered: number;

  @Column({ type: 'date' })
  startingDate: string;

  @Column({ type: 'date' })
  endingDate: string;

  @OneToMany(() => RegistrationRecord, (record) => record.course, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  registrationRecords: RegistrationRecord[];
}
