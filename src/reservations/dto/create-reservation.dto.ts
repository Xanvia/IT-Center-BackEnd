import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsBoolean,
  IsDecimal,
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
  @IsOptional()
  Equipment: string;

  @IsNotEmpty()
  @IsBoolean()
  isAC: boolean;

  @IsNotEmpty()
  @IsString()
  specialities: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsDecimal()
  feeRatePerHour: number;
}
