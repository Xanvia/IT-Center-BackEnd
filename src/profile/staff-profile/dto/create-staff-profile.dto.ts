import {
  IsString,
  IsArray,
  IsEmail,
  MaxLength,
  Length,
  IsEnum,
  ArrayMaxSize,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Title } from 'enums/title.enum';
import { Column } from 'typeorm';

export class CreateStaffProfileDto {
  @IsEnum(Title)
  title: Title;

  @IsString()
  @IsNotEmpty()
  requestBy: string;

  @IsString()
  @MaxLength(50)
  displayName: string;

  @IsString()
  designation: string;

  @IsString()
  @IsOptional()
  nominal: string;

  @IsString()
  @MaxLength(10)
  extNo?: string;

  @IsArray()
  @IsEmail({}, { each: true })
  @ArrayMaxSize(2)
  emails: string[];

  @IsArray()
  @Length(7, 15, { each: true }) // telephone numbers are between 7 and 15 digits
  @ArrayMaxSize(2)
  telephones: string[];
}
