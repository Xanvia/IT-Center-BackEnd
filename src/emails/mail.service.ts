// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async testMail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to IT Center!',
      template: __dirname + '/template/confirmation',
      context: {
        name: 'john doe',
      },
    });
  }
}
