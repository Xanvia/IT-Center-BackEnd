import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  @IsNumber()
  seatLimit: number;

  @IsNumber()
  @IsOptional()
  noOfComputers: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  availableSoftwares: string;

  @IsNotEmpty()
  @IsString()
  equipment: string;

  @IsNotEmpty()
  @IsBoolean()
  isAC: boolean;

  @IsNotEmpty()
  @IsString()
  location: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  feeRatePerHour: number;
}
