// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ReserveRecord } from 'src/reserve-records/entities/reserve-record.entity';

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
}
