import { Injectable } from '@nestjs/common';
import { ContentsService } from '../contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService extends ContentsService {
  constructor(@InjectRepository(News) private newsRepo: Repository<News>) {
    super(newsRepo);
  }

  // create news
  async createContent() {}
}
