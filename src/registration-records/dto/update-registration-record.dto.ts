import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrationRecordDto } from './create-registration-record.dto';

export class UpdateRegistrationRecordDto extends PartialType(CreateRegistrationRecordDto) {}
