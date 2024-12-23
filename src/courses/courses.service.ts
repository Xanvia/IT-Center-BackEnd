import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseImage } from './entities/courseImage.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
    @InjectRepository(CourseImage)
    private courseImageRepo: Repository<CourseImage>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const { images, ...courseData } = createCourseDto;

      const course = this.courseRepo.create(courseData);
      const courseImages = await this.courseImageRepo.create(
        images.map((path) => ({ path })),
      );

      course.images = courseImages;

      return await this.courseRepo.save(course);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepo.find();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found!`);
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const { images, ...updateData } = updateCourseDto;

    // Convert image IDs to CourseImage entities
    const courseImages = images
      ? images.map((id) => ({ id }) as CourseImage)
      : undefined;

    // Update the course
    await this.courseRepo.update(id, {
      ...updateData,
      ...(courseImages && { images: courseImages }),
    });

    const updatedCourse = await this.courseRepo.findOneBy({ id });
    if (!updatedCourse) {
      throw new NotFoundException(`Course with id ${id} not found!`);
    }

    return updatedCourse;
  }

  async remove(id: string): Promise<DeleteResult> {
    const result = await this.courseRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with id ${id} not found!`);
    }
    return result;
  }
}
