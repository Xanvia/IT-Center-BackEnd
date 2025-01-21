// src/mail/mail.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('test')
  async sendConfirmation(@Body('email') email: string) {
    await this.mailService.testMail(email);
    return { message: 'Confirmation email sent' };
  }
}
