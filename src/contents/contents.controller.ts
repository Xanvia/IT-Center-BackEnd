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

  @Post('log')
  createLog(@Body() createcontentDto: CreateContentDto) {
    return this.contentService.createContent(createcontentDto, 'log');
  }

  @Post('project')
  createProject(@Body() createcontentDto: CreateContentDto) {
    return this.contentService.createContent(createcontentDto, 'project');
  }

  @Post('news')
  createNews(@Body() createcontentDto: CreateContentDto) {
    return this.contentService.createContent(createcontentDto, 'news');
  }

  @Put(':id')
  updateLogs(
    @Param('id') id: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    return this.contentService.updateContent(id, updateContentDto);
  }

  @Delete(':id')
  deleteContent(@Param('id') id: string) {
    return this.contentService.deleteContentbyID(id);
  }

  // not tested
  @UseGuards(JwtAuthGuard)
  @Post('upload-img')
  @UseInterceptors(
    FilesInterceptor('content', 5, {
      storage: diskStorage({
        destination: './uploads/contents',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // e.g., image-123456789.png
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new BadRequestException('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req) {
    if (!files) {
      throw new BadRequestException('No files uploaded');
    }
    // get urls and return
    const paths = files.map((file) => file.path);
    return {
      message: 'Files uploaded successfully',
      paths: paths,
    };
  }
}
