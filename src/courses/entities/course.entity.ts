import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CourseImage } from './courseImage.entity';

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

  @Column()
  instructor: string;

  @ManyToOne(() => CourseImage, (image) => image.course)
  images: CourseImage[];

  @Column()
  studentLimit: number;

  @Column()
  registered: number;

  @Column({ type: 'date' })
  startingDate: Date;

  @Column({ type: 'date' })
  endingDate: Date;
}
