import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from 'enums/registration.enum';

export class BulkUpdateDto {
  @Type(() => String)
  courseId: string;

  @IsOptional()
  @IsString()
  batch: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsEnum(Status)
  newStatus: Status;
}
