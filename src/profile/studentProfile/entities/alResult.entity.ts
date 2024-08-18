import { Grade } from 'enums/grade.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Education } from './education.entity';

@Entity()
export class ALResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column({ type: 'enum', enum: Grade })
  grade: Grade;

  @ManyToOne(() => Education, (parent) => parent.aLevelResults)
  profile: Education;
}
