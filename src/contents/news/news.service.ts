import { Injectable } from '@nestjs/common';
import { ContentsService } from '../contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './news.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';

@Injectable()
export class NewsService extends ContentsService {
  constructor(@InjectRepository(News) private newsRepo: Repository<News>) {
    super(newsRepo);
  }

  // create news
  async createNews(createNewsDto: CreateNewsDto) {
    const newItem = this.newsRepo.create({ ...createNewsDto });

    return await this.newsRepo.save(newItem);
  }

  // update news
  async updateNews(id: string, updateNewsDto: UpdateNewsDto) {
    return await this.newsRepo.update({ id }, { ...updateNewsDto });
  }
}
