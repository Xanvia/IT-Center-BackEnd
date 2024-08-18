import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { NewsModule } from './contents/news/news.module';
import { LogsModule } from './contents/logs/logs.module';
import { ProjectsModule } from './contents/projects/projects.module';
// import { ProjController } from './contents/proj/proj.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    FeedbacksModule,
    NewsModule,
    LogsModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
