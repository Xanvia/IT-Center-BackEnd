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
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
