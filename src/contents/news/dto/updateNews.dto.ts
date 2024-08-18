import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './createNews.dto';

// This Partial Type function creates a copy of createNewsDto
// And keeping eveything optional
export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
