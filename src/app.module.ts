import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { NewsModule } from './contents/news/news.module';
import { LogsModule } from './contents/logs/logs.module';
import { ProjectsModule } from './contents/projects/projects.module';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),

    FeedbacksModule,
    NewsModule,
    LogsModule,
    ProjectsModule,
    AuthModule,
    UsersModule,
    StudentProfileModule,
    StaffProfileModule,
    ReservationsModule,
    CoursesModule,
    ReserveRecordsModule,
    NotificationsModule,
    RegistrationRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
