import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Enrollment } from './entities/enrollment.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Enrollment])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [TypeOrmModule],
})
export class CourseModule {}
