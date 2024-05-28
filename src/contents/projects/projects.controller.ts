import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Content } from '../content.entity';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Content[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findbyID(@Param('id') id: string): Promise<Content> {
    return this.projectsService.findbyID(id);
  }

  @Post()
  createProject(@Body() createProjectsDto: CreateProjectDto) {
    return this.projectsService.createContent<CreateProjectDto>(
      createProjectsDto,
    );
  }

  @Put(':id')
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.updateContent<UpdateProjectDto>(
      id,
      updateProjectDto,
    );
  }
}
