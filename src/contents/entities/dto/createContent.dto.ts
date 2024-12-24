import {
  IsDate,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateContentDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  date?: string;

  @IsOptional()
  @IsString()
  images?: string[];

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Time must be in HH:mm:ss format',
  })
  time?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  venue?: string;
}
