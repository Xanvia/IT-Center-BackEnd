import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './createProject.dto';

// This Partial Type function creates a copy of createProjectDto
// And keeping eveything optional
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
