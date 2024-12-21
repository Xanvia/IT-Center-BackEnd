import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseImage } from './entities/courseImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseImage])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
