import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { Content } from '../content.entity';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  findAll(): Promise<Content[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  findbyID(@Param('id') id: string): Promise<Content> {
    return this.newsService.findbyID(id);
  }
}
