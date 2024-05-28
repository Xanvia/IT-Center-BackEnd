import { Injectable } from '@nestjs/common';
import { ContentsService } from '../contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService extends ContentsService {
  constructor(
    @InjectRepository(Project) private projectsRepo: Repository<Project>,
  ) {
    super(projectsRepo);
  }
}
