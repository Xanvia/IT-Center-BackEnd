import { Injectable, NotFoundException } from '@nestjs/common';
import { Content } from './entities/content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentImage } from './entities/contentImage.entity';
import { CreateContentDto } from './dto/createContent.dto';
import { UpdateContentDto } from './dto/updateContent.dto';
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
    return await this.logRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllProjects(): Promise<Content[]> {
    return await this.projectRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllNews(): Promise<Content[]> {
    return await this.newsRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // get content by id
  async findbyID(id: string): Promise<Content> {
    return await this.contentRepo.findOne({ where: { id: id } });
  }
  // delete by id
  async deleteContentbyID(id: string) {
    return await this.contentRepo.delete({ id: id });
  }

  // create Log
  async createContent(createContentsDto: CreateContentDto, type: string) {
    try {
      console.log(`Creating ${type} content:`, {
        title: createContentsDto.title,
        hasImages: !!(
          createContentsDto.images && createContentsDto.images.length
        ),
        imageCount: createContentsDto.images
          ? createContentsDto.images.length
          : 0,
      });

      const { images, ...rest } = createContentsDto;
      var newItem = null;
      if (type === 'log') {
        newItem = this.logRepo.create({ ...rest });
      } else if (type === 'project') {
        newItem = this.projectRepo.create({ ...rest });
      } else if (type === 'news') {
        newItem = this.newsRepo.create({ ...rest });
      }

      if (!newItem) {
        throw new Error(`Invalid content type: ${type}`);
      }

      if (images && images.length) {
        console.log(`Processing ${images.length} images for ${type}:`, images);
        newItem.images = images.map((image) => {
          const newImage = new ContentImage();
          newImage.path = image;
          return newImage;
        });
      }

      const savedItem = await this.contentRepo.save(newItem);
      console.log(
        `Successfully created ${type} content with ID:`,
        savedItem.id,
      );
      return savedItem;
    } catch (error) {
      console.error(`Error creating ${type} content:`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
      });
      throw new Error(`Failed to create ${type} content: ${error.message}`);
    }
  }

  // update Content
  async updateContent(id: string, updateContentDto: UpdateContentDto) {
    try {
      const existingContent = await this.contentRepo.findOne({
        where: { id: id },
        relations: ['images'],
      });

      if (!existingContent) {
        throw new NotFoundException(`Content with ID '${id}' not found`);
      }

      const { images, ...rest } = updateContentDto;
      const updatedContent = this.contentRepo.merge(existingContent, {
        ...rest,
      });

      if (images && images.length) {
        // Remove existing images if new ones are provided
        updatedContent.images = [];
        updatedContent.images = images.map((image) => {
          const newImage = new ContentImage();
          newImage.path = image;
          return newImage;
        });
      }

      return await this.contentRepo.save(updatedContent);
    } catch (error) {
      console.error(`Error updating content with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update content: ${error.message}`);
    }
  }
}
