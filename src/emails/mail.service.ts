// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ReserveRecord } from 'src/reserve-records/entities/reserve-record.entity';
import { RegistrationRecord } from 'src/registration-records/entities/registration-record.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async testMail(email: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to IT Center!',
        template: __dirname + '/template/confirmation',
        context: {
          name: 'john doe',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createReservationRecord(record: ReserveRecord) {
    try {
      await this.mailerService.sendMail({
        to: record.user.email,
        subject: 'Your Reservation record sent successfully!',
        template: __dirname + '/template/reservationCreate',
        context: record,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async confirmReservationRecord(record: ReserveRecord) {
    try {
      await this.mailerService.sendMail({
        to: record.user.email,
        subject:
          'Reservation: Your Request Has Been Confirmed. Proceed with Payment',
        template: __dirname + '/template/reservationConfirm',
        context: record,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateReservationRecord(record: ReserveRecord) {
    try {
      await this.mailerService.sendMail({
        to: record.user.email,
        subject: 'Reservation: Your Reservation has been updated.',
        template: __dirname + '/template/reservationUpdate',
        context: record,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createRegistrationRecord(record: RegistrationRecord) {
    try {
      await this.mailerService.sendMail({
        to: record.student.email,
        subject:
          'Course Registration Request: Under Review and Awaiting Confirmation.',
        template: __dirname + '/template/registrationCreate',
        context: record,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async confirmRegistrationRecord(record: RegistrationRecord) {
    try {
      await this.mailerService.sendMail({
        to: record.student.email,
        subject:
          'Course Registration: Your Request Has Been Confirmed. Proceed with Payment',
        template: __dirname + '/template/registrationConfirm',
        context: record,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateRegistrationRecord(record: RegistrationRecord) {
    try {
      await this.mailerService.sendMail({
        to: record.student.email,
        subject: 'Course Section: Update from Course Management System',
        template: __dirname + '/template/registrationUpdate',
        context: record,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
