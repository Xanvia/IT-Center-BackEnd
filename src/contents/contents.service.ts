import { Injectable } from '@nestjs/common';
import { Content } from './content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogsDto } from './logs/dto/createLogs.dto';
import { CreateNewsDto } from './news/dto/createNews.dto';
import { UpdateNewsDto } from './news/dto/updateNews.dto';
import { CreateProjectDto } from './projects/dto/createProject.dto';
import { UpdateLogsDto } from './logs/dto/updateLogs.dto';
import { UpdateProjectDto } from './projects/dto/updateProject.dto';

@Injectable()
export abstract class ContentsService {
  constructor(
    @InjectRepository(Content) private contentRepo: Repository<Content>,
  ) {}

  // get all content
  async findAll(): Promise<Content[]> {
    return await this.contentRepo.find();
  }
  // get content by id
  async findbyID(id: string): Promise<Content> {
    return await this.contentRepo.findOne({ where: { id: id } });
  }
  // delete by id
  async deleteContentbyID(id: string) {
    return await this.contentRepo.delete({ id: id });
  }

  // create Content
  async createContent(
    createContentsDto: CreateLogsDto | CreateNewsDto | CreateProjectDto,
  ) {
    const newItem = this.contentRepo.create({ ...createContentsDto });

    return await this.contentRepo.save(newItem);
  }

  // update Content
  async updateContent(
    id: string,
    updateContentDto: UpdateLogsDto | UpdateNewsDto | UpdateProjectDto,
  ) {
    return await this.contentRepo.update({ id }, { ...updateContentDto });
  }
}
