import { IsEmail, IsString } from 'class-validator';

export class CreateConsultationDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  serviceType: string;

  @IsString()
  description: string;
}
