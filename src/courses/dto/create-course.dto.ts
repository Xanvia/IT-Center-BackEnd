import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  courseName: string;

  @IsString()
  courseCode: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;

  @IsString()
  registrationDeadline: string;

  @IsNumber()
  fees: number;

  @IsString()
  audience: string;

  @IsOptional()
  @IsString()
  instructor?: string;

  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @IsNumber()
  studentLimit: number;

  @IsOptional()
  @IsNumber()
  registered?: number;

  @Type(() => Date)
  @IsDate()
  startingDate: string;

  @Type(() => Date)
  @IsDate()
  endingDate: string;
}
