import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { ContentsService } from './contents/contents.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    FeedbacksModule,
  ],
  controllers: [AppController],
  providers: [AppService, ContentsService],
})
export class AppModule {}
