import { PartialType } from '@nestjs/mapped-types';
import { CreateLogsDto } from './createLogs.dto';

// This Partial Type function creates a copy of createLogsDto
// And keeping eveything optional
export class UpdateLogsDto extends PartialType(CreateLogsDto) {}
