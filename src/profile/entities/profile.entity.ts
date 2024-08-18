import { Title } from 'enums/title.enum';
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Education } from './education.entity';

export abstract class Profile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: Title })
  title: Title;

  @Column()
  fullName: string;

  @Column()
  nameWithIntials: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => Education, (education) => education.profile)
  @JoinColumn()
  education: Education;
}
