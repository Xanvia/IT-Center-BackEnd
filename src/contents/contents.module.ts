import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Log } from './entities/log.entity';
import { News } from './entities/news.entity';
import { Project } from './entities/project.entity';
import { ContentImage } from './entities/contentImage.entity';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content, Log, News, Project, ContentImage]),
  ],
  providers: [ContentsService],
  controllers: [ContentsController],
})
export class ContentsModule {}
