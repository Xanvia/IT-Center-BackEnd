import { Controller, Post, Get, Body } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // @Post()
  // createCourse(@Body() createCourseDto: CreateCourseDto) {
  //   return this.courseService.createCourse(createCourseDto);
  // }

  // @Get()
  // getAllCourses() {
  //   return this.courseService.getAllCourses();
  // }

  // @Post('enroll')
  // enrollInCourse(@Body() enrollCourseDto: EnrollCourseDto) {
  //   return this.courseService.enrollInCourse(enrollCourseDto);
  // }

  // @Patch('enrollment/:id/approve')
  // approveEnrollment(@Param('id') id: string) {
  //   return this.courseService.approveEnrollment(id);
  // }
}
