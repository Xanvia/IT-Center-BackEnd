import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistrationRecordDto } from './dto/create-registration-record.dto';
import { UpdateRegistrationRecordDto } from './dto/update-registration-record.dto';
import { Repository } from 'typeorm';
import { RegistrationRecord } from './entities/registration-record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { CoursesService } from 'src/courses/courses.service';
import { Status } from 'enums/registration.enum';

@Injectable()
export class RegistrationRecordsService {
  constructor(
    @InjectRepository(RegistrationRecord)
    private readonly repo: Repository<RegistrationRecord>,
    private readonly studentService: UsersService,
    private readonly courseService: CoursesService,
  ) {}

  async create(createRegistrationRecordDto: CreateRegistrationRecordDto) {
    try {
      const { studentId, courseId, status, result, paymentDate } =
        createRegistrationRecordDto;
      const student = await this.studentService.findOne(studentId);
      const course = await this.courseService.findOne(courseId);
      const registrationRecord = this.repo.create({
        student,
        course,
        status,
        result,
        paymentDate,
      });
      const record = await this.repo.save(registrationRecord);
      return 'Record created successfully';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.repo.find();
  }

  async findAllforUser(userId: string) {
    return await this.repo
      .createQueryBuilder('record')
      .leftJoin('record.course', 'course')
      .addSelect([
        'course.id',
        'course.courseName',
        'course.courseCode',
        'course.fees',
      ])
      .where('record.student.id = :userId', { userId })
      .getMany();
  }

  async getAllRecordsCourseWise() {
    return await this.repo
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.course', 'course')
      .leftJoinAndSelect('record.student', 'student')
      .select([
        'course.id as courseId',
        'course.courseName as courseName',
        'JSON_ARRAYAGG(JSON_OBJECT(' +
          '"id", record.id, ' +
          '"studentId", student.id, ' +
          '"name", student.name, ' +
          "'email', student.email, " +
          '"profileImage", student.image, ' +
          '"grade", record.result, ' +
          '"status", record.status' +
          ')) as students',
      ])
      .groupBy('course.id')
      .getRawMany();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: string, updateRegistrationRecordDto: UpdateRegistrationRecordDto) {
    try {
      this.repo.update(id, updateRegistrationRecordDto);
      return 'Record updated successfully';
    } catch (err) {
      throw new Error('Error while updating the record');
    }
  }

  // update every record with status PENDING to status NOTPAID
  async updateAllPendingRecords() {
    try {
      await this.repo.update(
        { status: Status.PENDING },
        { status: Status.NOTPAID },
      );
      return 'Records updated successfully';
    } catch (err) {
      throw new Error('Error while updating the records');
    }
  }

  remove(id: string) {
    try {
      this.repo.delete(id);
      return 'Record deleted successfully';
    } catch (err) {
      throw new Error('Error while deleting the record');
    }
  }
}
