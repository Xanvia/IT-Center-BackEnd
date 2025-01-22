import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { databaseConfig } from 'config/database.config';
import { StudentProfileModule } from './profile/student-profile/student-profile.module';
import { StaffProfileModule } from './profile/staff-profile/staff-profile.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CoursesModule } from './courses/courses.module';
import { ReserveRecordsModule } from './reserve-records/reserve-records.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RegistrationRecordsModule } from './registration-records/registration-records.module';
import { ContentsModule } from './contents/contents.module';
import { MailModule } from './emails/mail.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),

    FeedbacksModule,
    AuthModule,
    UsersModule,
    StudentProfileModule,
    StaffProfileModule,
    ReservationsModule,
    CoursesModule,
    ReserveRecordsModule,
    NotificationsModule,
    RegistrationRecordsModule,
    ContentsModule,
    MailModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
