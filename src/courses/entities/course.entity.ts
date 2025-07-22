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

  @Column('text')
  description: string;

  @Column()
  duration: string;

  @Column({ default: 'Throughout the year' })
  @IsOptional()
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

  @Column({ nullable: true })
  @IsOptional()
  studentLimit: number;

  @Column({ default: 0 })
  @IsOptional()
  registered: number;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  startingDate: string;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  endingDate: string;

  @OneToMany(() => RegistrationRecord, (record) => record.course, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  registrationRecords: RegistrationRecord[];
}
