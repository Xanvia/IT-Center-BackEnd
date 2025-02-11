import { Module } from '@nestjs/common';
import { StudentProfileService } from './student-profile.service';
import { StudentProfileController } from './student-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentProfile } from './entities/studentProfile.entity';
import { ALResult } from './entities/alResult.entity';
import { Education } from './entities/education.entity';
import { Employment } from './entities/employment.entity';
import { HigherEdu } from './entities/higherEdu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentProfile,
      ALResult,
      Education,
      Education,
      Employment,
      HigherEdu,
    ]),
  ],
  controllers: [StudentProfileController],
  providers: [StudentProfileService],
  exports: [StudentProfileService],
})
export class StudentProfileModule {}
