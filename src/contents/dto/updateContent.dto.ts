import { PartialType } from '@nestjs/mapped-types';
import { CreateContentDto } from './createContent.dto';

export class UpdateContentDto extends PartialType(CreateContentDto) {}
