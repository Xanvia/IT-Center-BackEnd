import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Title } from 'enums/title.enum';
import { Type } from 'class-transformer';
import { Grade } from 'enums/grade.enum';

// ALResult DTO
class ALResultDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsEnum(Grade)
  grade: Grade;
}

// Education DTO
class EducationDto {
  @IsEnum(Grade)
  englishOL: Grade;

  @IsEnum(Grade)
  mathematicsOL: Grade;

  @IsEnum(Grade)
  scienceOL: Grade;

  @ValidateNested({ each: true })
  @Type(() => ALResultDto)
  aLevelResults: ALResultDto[];
}

// HigherEdu DTO
class HigherEduDto {
  @IsString()
  @IsNotEmpty()
  FOQualification: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  institute?: string;
}

// Employment DTO
class EmploymentDto {
  @IsOptional()
  @IsString()
  institution: string;

  @IsOptional()
  @IsString()
  designation: string;

  @IsOptional()
  @IsString()
  officeAddress?: string;

  @IsOptional()
  @IsString()
  officePhone?: string;
}

// Main CreateStudentProfileDto
export class CreateStudentProfileDto {
  @IsEnum(Title)
  title: Title;

  @IsString()
  @IsOptional()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  nameWithIntials: string;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  nationalIdCardNo: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  otherQualification?: string;

  @ValidateNested()
  @Type(() => EducationDto)
  education: EducationDto;

  @ValidateNested({ each: true })
  @Type(() => HigherEduDto)
  higherEdu: HigherEduDto[];

  @ValidateNested()
  @Type(() => EmploymentDto)
  employment: EmploymentDto;
}
