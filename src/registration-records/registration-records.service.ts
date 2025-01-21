import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistrationRecordDto } from './dto/create-registration-record.dto';
import { UpdateRegistrationRecordDto } from './dto/update-registration-record.dto';
import { Repository } from 'typeorm';
import { RegistrationRecord } from './entities/registration-record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { CoursesService } from 'src/courses/courses.service';
import { Status } from 'enums/registration.enum';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MailService } from 'src/emails/mail.service';
import { Sender } from 'enums/sender.enum';

@Injectable()
export class RegistrationRecordsService {
  constructor(
    @InjectRepository(RegistrationRecord)
    private readonly repo: Repository<RegistrationRecord>,
    private readonly studentService: UsersService,
    private readonly courseService: CoursesService,
    private readonly notificationService: NotificationsService,
    private readonly mailService: MailService,
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

      await this.notificationService.createForUser({
        userId: record.student.id,
        sender: Sender.SYSTEM,
        subject: `Course Registration request for ${record.course.courseName}`,
        content: `Reqest sent successfully! We will send you a confirmation email once your request has been reviewed.`,
      });

      await this.mailService.createRegistrationRecord(registrationRecord);
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

  async findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateRegistrationRecordDto: UpdateRegistrationRecordDto,
  ) {
    try {
      const res = await this.repo.update(id, updateRegistrationRecordDto);

      if (res.affected === 0) {
        return 'No changes applied';
      }

      const record = await this.repo.findOne({
        where: { id },
        relations: ['student', 'course'],
      });

      if (!record) {
        throw new BadRequestException('Record not found');
      }

      if (updateRegistrationRecordDto.status === Status.NOTPAID) {
        await this.notificationService.createForUser({
          userId: record.student.id,
          sender: Sender.SYSTEM,
          subject: `Course request confirmation for ${record.course.courseName}`,
          content: `Your Request for course ${record.course.courseName} has been confirmed. You may now proceed with the payment.`,
        });

        await this.mailService.confirmRegistrationRecord(record);
      } else {
        await this.notificationService.createForUser({
          userId: record.student.id,
          sender: Sender.SYSTEM,
          subject: `Update from Course Management System: ${record.course.courseName}`,
          content: `Update for course ${record.course.courseName}. Please check your email or Your Enrolled-Course section for more details.`,
        });

        await this.mailService.updateRegistrationRecord(record);
      }

      return 'Record updated successfully';
    } catch (err) {
      throw new BadRequestException('Error while updating the record');
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
      throw new BadRequestException('Error while updating the records');
    }
  }

  async remove(id: string) {
    try {
      await this.repo.delete(id);
      return 'Record deleted successfully';
    } catch (err) {
      throw new BadRequestException('Error while deleting the record');
    }
  }
}
