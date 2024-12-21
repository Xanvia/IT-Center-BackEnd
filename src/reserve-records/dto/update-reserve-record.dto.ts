import { PartialType } from '@nestjs/mapped-types';
import { CreateReserveRecordDto } from './create-reserve-record.dto';

export class UpdateReserveRecordDto extends PartialType(CreateReserveRecordDto) {}
