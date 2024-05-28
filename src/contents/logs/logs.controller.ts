import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Content } from '../content.entity';
import { CreateLogsDto } from './dto/createLogs.dto';
import { UpdateLogsDto } from './dto/updateLogs.dto';

@Controller('logs')
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Get()
  findAll(): Promise<Content[]> {
    return this.logsService.findAll();
  }

  @Get(':id')
  findbyID(@Param('id') id: string): Promise<Content> {
    return this.logsService.findbyID(id);
  }

  @Post()
  createLogs(@Body() createLogsDto: CreateLogsDto) {
    return this.logsService.createContent<CreateLogsDto>(createLogsDto);
  }

  @Put(':id')
  updateLogs(@Param('id') id: string, @Body() updatelogDto: UpdateLogsDto) {
    return this.logsService.updateContent<UpdateLogsDto>(id, updatelogDto);
  }
}
