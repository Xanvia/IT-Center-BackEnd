import { IsString, IsOptional, IsNumber, IsDate, IsDecimal, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  courseName: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;

  @IsString()
  registrationDeadline: string;

  @IsDecimal()
  fees: number;

  @IsString()
  audience: string;

  @IsOptional()
  @IsString()
  instructor?: string;

  @IsOptional()
  @IsUUID('all', { each: true })
  images?: string[];

  @IsNumber()
  studentLimit: number;

  @IsOptional()
  @IsNumber()
  registered?: number;

  @IsDate()
  startingDate: Date;

  @IsDate()
  endingDate: Date;
}
