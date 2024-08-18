import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NewsService } from './news.service';
import { Content } from '../content.entity';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';

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

  @Post()
  createNews(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.createContent<CreateNewsDto>(createNewsDto);
  }

  @Put(':id')
  updateNews(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.updateContent<UpdateNewsDto>(id, updateNewsDto);
  }
}
