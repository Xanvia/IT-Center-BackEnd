import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Enrollment } from './entities/enrollment.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { EnrollCourseDto } from './dto/enroll-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  // Create a new course
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async enrollInCourse(enrollCourseDto: EnrollCourseDto): Promise<Enrollment> {
    const enrollment = this.enrollmentRepository.create({
      course: { id: enrollCourseDto.courseId },
      user: { id: enrollCourseDto.userId },
    });
    return this.enrollmentRepository.save(enrollment);
  }

  async approveEnrollment(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOne({ where: { id } });
    if (enrollment) {
      enrollment.isApproved = true;
      return this.enrollmentRepository.save(enrollment);
    }
    return null;
  }
}
