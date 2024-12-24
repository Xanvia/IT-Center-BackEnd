import { Injectable, NotFoundException } from '@nestjs/common';
import { Content } from './entities/content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentImage } from './entities/contentImage.entity';
import { CreateContentDto } from './entities/dto/createContent.dto';
import { UpdateContentDto } from './entities/dto/updateContent.dto';
import { Log } from './entities/log.entity';
import { Project } from './entities/project.entity';
import { News } from './entities/news.entity';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content) private contentRepo: Repository<Content>,
    @InjectRepository(Log) private logRepo: Repository<Log>,
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(News) private newsRepo: Repository<News>,
  ) {}

  // get all content
  async findAllLogs(): Promise<Content[]> {
    return await this.logRepo.find();
  }

  async findAllProjects(): Promise<Content[]> {
    return await this.projectRepo.find();
  }

  async findAllNews(): Promise<Content[]> {
    return await this.newsRepo.find();
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
  async createContent(createContentsDto: CreateContentDto) {
    const { images, ...rest } = createContentsDto;
    const newItem = this.contentRepo.create({ ...rest });

    if (images && images.length) {
      newItem.images = images.map((image) => {
        const newImage = new ContentImage();
        newImage.path = image;
        return newImage;
      });
    }

    return await this.contentRepo.save(newItem);
  }

  // update Content
  async updateContent(id: string, updateContentDto: UpdateContentDto) {
    const existingContent = await this.contentRepo.findOne({
      where: { id: id },
    });
    if (!existingContent) {
      throw new NotFoundException(`Content with ID '${id}' not found`);
    }

    const { images, ...rest } = updateContentDto;
    const updatedContent = this.contentRepo.merge(existingContent, { ...rest });

    if (images && images.length) {
      updatedContent.images = images.map((image) => {
        const newImage = new ContentImage();
        newImage.path = image;
        return newImage;
      });
    }

    return await this.contentRepo.save(updatedContent);
  }
}
