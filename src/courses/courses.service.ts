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

  // get stats
  async getStatistics() {
    const courses = await this.courseRepo.find({
      relations: {
        registrationRecords: true,
      },
    });

    // total students grouped by course name
    const totalStudents = courses.map((course) => ({
      code: course.courseCode,
      total: course.registrationRecords.length,
    }));

    // total students registered per month grouped by month name
    function getLastSixMonthsRecords(courses) {
      // Get current date
      const today = new Date();

      // Get last 6 months
      const lastSixMonths = [];
      for (let i = 0; i < 6; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        lastSixMonths.push({
          month: date.toLocaleString('default', { month: 'long' }),
          year: date.getFullYear(),
          key: `${date.getFullYear()}-${date.getMonth() + 1}`,
        });
      }

      // Initialize a map for results
      const groupedRecords = lastSixMonths.reduce((acc, { key, month }) => {
        acc[key] = { month, count: 0 };
        return acc;
      }, {});

      // Iterate through courses and their registration records
      courses.forEach((course) => {
        course.registrationRecords.forEach((record) => {
          const recordDate = new Date(record.registrationDate);
          const recordKey = `${recordDate.getFullYear()}-${recordDate.getMonth() + 1}`;

          // Increment the count if the record falls in the last six months
          if (groupedRecords[recordKey]) {
            groupedRecords[recordKey].count++;
          }
        });
      });

      // Convert groupedRecords map to an array for easy readability
      return Object.values(groupedRecords);
    }

    const totalStudentsLast6Months = getLastSixMonthsRecords(courses).reverse();

    const totalCourses = courses.length;
    return { totalCourses, totalStudents, totalStudentsLast6Months };
  }
}
