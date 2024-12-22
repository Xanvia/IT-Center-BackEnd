import { Injectable } from '@nestjs/common';
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
    const {
      studentId,
      courseId,
      registrationDate,
      status,
      result,
      paymentDate,
    } = createRegistrationRecordDto;
    const student = await this.studentService.findOne(studentId);
    const course = await this.courseService.findOne(courseId);
    const registrationRecord = this.repo.create({
      student,
      course,
      registrationDate,
      status,
      result,
      paymentDate,
    });
    return await this.repo.save(registrationRecord);
  }

  async findAll() {
    return await this.repo.find();
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
          '"id", student.id, ' +
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

  findOne(id: number) {
    return `This action returns a #${id} registrationRecord`;
  }

  update(id: number, updateRegistrationRecordDto: UpdateRegistrationRecordDto) {
    return `This action updates a #${id} registrationRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} registrationRecord`;
  }
}
