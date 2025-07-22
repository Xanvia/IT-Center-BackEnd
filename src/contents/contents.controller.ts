import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { Content } from './entities/content.entity';
import { CreateContentDto } from './dto/createContent.dto';
import { UpdateContentDto } from './dto/updateContent.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth/jwt-auth.guard';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { UploadErrorInterceptor } from './interceptors/upload-error.interceptor';
import { UploadUtils } from '../common/utils/upload.utils';

@Controller('contents')
export class ContentsController {
  constructor(private contentService: ContentsService) {}

  @Get('logs')
  findAllLogs(): Promise<Content[]> {
    return this.contentService.findAllLogs();
  }

  @Get('projects')
  findAllProjects(): Promise<Content[]> {
    return this.contentService.findAllProjects();
  }

  @Get('news')
  findAllNews(): Promise<Content[]> {
    return this.contentService.findAllNews();
  }

  @Get(':id')
  findbyID(@Param('id') id: string): Promise<Content> {
    return this.contentService.findbyID(id);
  }

  @Post('/logs')
  async createLog(@Body() createcontentDto: CreateContentDto) {
    try {
      return await this.contentService.createContent(createcontentDto, 'log');
    } catch (error) {
      throw new BadRequestException(`Failed to create log: ${error.message}`);
    }
  }

  @Post('/projects')
  async createProject(@Body() createcontentDto: CreateContentDto) {
    try {
      return await this.contentService.createContent(
        createcontentDto,
        'project',
      );
    } catch (error) {
      throw new BadRequestException(
        `Failed to create project: ${error.message}`,
      );
    }
  }

  @Post('/news')
  async createNews(@Body() createcontentDto: CreateContentDto) {
    try {
      return await this.contentService.createContent(createcontentDto, 'news');
    } catch (error) {
      throw new BadRequestException(`Failed to create news: ${error.message}`);
    }
  }

  @Put(':id')
  async updateLogs(
    @Param('id') id: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    try {
      return await this.contentService.updateContent(id, updateContentDto);
    } catch (error) {
      throw new BadRequestException(
        `Failed to update content: ${error.message}`,
      );
    }
  }

  @Delete(':id')
  deleteContent(@Param('id') id: string) {
    return this.contentService.deleteContentbyID(id);
  }

  // not tested
  @UseGuards(JwtAuthGuard)
  @Post('/upload')
  @UseInterceptors(
    FilesInterceptor('content', 5, {
      storage: diskStorage(
        UploadUtils.createUploadStorage({
          directory: 'contents',
          fieldName: 'content',
          maxFiles: 5,
          maxFileSize: 5 * 1024 * 1024,
        }),
      ),
      limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
      fileFilter: UploadUtils.createFileFilter(),
    }),
  )
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    try {
      // get urls and return
      const paths = files.map((file) => file.path);
      return {
        message: 'Files uploaded successfully',
        paths: paths,
      };
    } catch (error) {
      UploadUtils.handleUploadError(error, 'contents');
    }
  }
}
