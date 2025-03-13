import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Grade } from 'enums/grade.enum';
import { Status } from 'enums/registration.enum';

export class CreateRegistrationRecordDto {
  @Type(() => String)
  studentId: string;

  @Type(() => String)
  courseId: string;

  @IsOptional()
  @IsString()
  batch: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsEnum(Grade)
  result: Grade;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  paymentDate?: Date;
}
