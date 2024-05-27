import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.entity';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  findbyID(@Param('id') id: string): Promise<News> {
    return this.newsService.findbyID(id);
  }
}
