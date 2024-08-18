import { Injectable } from '@nestjs/common';
import { ContentsService } from '../contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogsService extends ContentsService {
  constructor(@InjectRepository(Log) private logsRepo: Repository<Log>) {
    super(logsRepo);
  }
}
