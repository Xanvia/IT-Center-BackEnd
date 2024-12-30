import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ReservationStatus, TimeSlot } from 'enums/reservation.enum';

export class CreateReserveRecordDto {
  @IsString()
  eventName: string;

  @IsDate()
  @Type(() => Date)
  startingDate: Date;

  @IsDate()
  @Type(() => Date)
  endingDate: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TimeSlot)
  timeSlot: TimeSlot;

  @IsOptional()
  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  @IsString()
  reservationId: string;
}
