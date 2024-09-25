import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/Image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async saveFileData(file: Express.Multer.File): Promise<Image> {
    const newImage = this.imageRepository.create({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      size: file.size,
    });
    return await this.imageRepository.save(newImage);
  }
}
