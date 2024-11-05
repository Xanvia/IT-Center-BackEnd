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

  @IsNotEmpty()
  @IsNumber()
  noOfComputers: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  machineDetails: string;

  @IsNotEmpty()
  @IsBoolean()
  isAC: boolean;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  specialities: string;

  @IsNotEmpty()
  @IsDecimal()
  fees: number;
}
