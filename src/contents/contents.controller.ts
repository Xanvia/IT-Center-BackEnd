import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { Content } from './entities/content.entity';
import { CreateContentDto } from './dto/createContent.dto';
import { UpdateContentDto } from './dto/updateContent.dto';

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
}
