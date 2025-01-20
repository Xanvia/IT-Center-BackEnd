import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const course = this.courseRepo.create(createCourseDto);

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

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const updateData = { ...updateCourseDto };
    return await this.courseRepo.update(id, updateData);
  }

  async remove(id: string): Promise<DeleteResult> {
    const result = await this.courseRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with id ${id} not found!`);
    }
    return result;
  }
}
