import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Sender } from 'enums/sender.enum';

export class CreateNotificationDto {
  @IsEnum(Sender)
  sender: Sender;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
