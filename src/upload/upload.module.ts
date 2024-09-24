import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/Image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
