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
import { StudentProfileService } from './profile/student-profile/student-profile.service';
import { StudentProfileController } from './profile/student-profile/student-profile.controller';
import { StudentProfileModule } from './profile/student-profile/student-profile.module';
import { StaffProfileModule } from './profile/staff-profile/staff-profile.module';
import { UploadModule } from './upload/upload.module';

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
    UploadModule,
  ],
  controllers: [AppController, StudentProfileController],
  providers: [AppService, StudentProfileService],
})
export class AppModule {}
