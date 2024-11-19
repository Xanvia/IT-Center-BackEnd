import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepo.create(createCourseDto);
    return await this.courseRepo.save(course);
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
    await this.courseRepo.update(id, updateCourseDto);
    const updatedCourse = await this.courseRepo.findOneBy({ id });
    if (!updatedCourse) {
      throw new NotFoundException(`Course with id ${id} not found!`);
    }
    return updatedCourse;
  }

  async remove(id: string): Promise<void> {
    const result = await this.courseRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with id ${id} not found!`);
    }
  }
}
