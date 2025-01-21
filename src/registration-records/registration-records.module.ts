import { Module } from '@nestjs/common';
import { RegistrationRecordsService } from './registration-records.service';
import { RegistrationRecordsController } from './registration-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationRecord } from './entities/registration-record.entity';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';
import { MailModule } from 'src/emails/mail.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegistrationRecord]),
    UsersModule,
    CoursesModule,
    MailModule,
    NotificationsModule,
  ],
  controllers: [RegistrationRecordsController],
  providers: [RegistrationRecordsService],
})
export class RegistrationRecordsModule {}
