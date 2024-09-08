import { Grade } from 'enums/grade.enum';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ALResult } from './alResult.entity';
import { BadRequestException } from '@nestjs/common';
import { StudentProfile } from './profile.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Grade })
  englishOL: Grade;

  @Column({ type: 'enum', enum: Grade })
  mathematicsOL: Grade;

  @Column({ type: 'enum', enum: Grade })
  scienceOL: Grade;

  @OneToMany(() => ALResult, (result) => result.profile, {
    cascade: true,
    eager: true,
  })
  aLevelResults: ALResult[];

  @OneToOne(() => StudentProfile, (profile) => profile.education, {
    cascade: true,
    eager: true,
  })
  profile: StudentProfile;

  @BeforeInsert()
  validateResults() {
    if (this.aLevelResults.length > 4) {
      throw new BadRequestException('Exactly 4 A/L results are required.');
    }
  }
}
