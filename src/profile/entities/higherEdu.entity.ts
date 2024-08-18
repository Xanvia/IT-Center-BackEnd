import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class HigherEdu {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  FOQualification: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  institute: string;

  @ManyToOne(() => Profile, (parent) => parent.higherEdu)
  user: Profile;
}
