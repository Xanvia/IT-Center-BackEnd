import { Injectable, NotFoundException } from '@nestjs/common';
import { Content } from './content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  async createContent<createDto>(createContentsDto: createDto) {
    const newItem = this.contentRepo.create({ ...createContentsDto });

    return await this.contentRepo.save(newItem);
  }

  // update Content
  async updateContent<updateDto>(id: string, updateContentDto: updateDto) {
    const existingContent = await this.contentRepo.findOne({
      where: { id: id },
    });
    if (!existingContent) {
      throw new NotFoundException(`Content with ID '${id}' not found`);
    }
    const state = await this.contentRepo.update(
      { id },
      { ...updateContentDto },
    );
    return this.contentRepo.findOne({ where: { id: id } });
  }
}
