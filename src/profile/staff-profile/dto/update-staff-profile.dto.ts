import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffProfileDto } from './create-staff-profile.dto';

// This Partial Type function creates a copy of createLogsDto
// And keeping eveything optional
export class UpdateStaffProfileDto extends PartialType(CreateStaffProfileDto) {}