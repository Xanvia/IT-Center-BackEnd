import { IsString, IsOptional, IsArray, IsEmail, MaxLength, Length } from 'class-validator';
  
export class CreateStaffProfileDto {
    @IsString()
    @MaxLength(50)
    displayName: string;
  
    @IsString()
    designation: string;
  
    @IsString()
    nominal: string;
  
    @IsString()
    @MaxLength(10)
    extNo?: string;
  
    @IsArray()
    @IsEmail({}, { each: true })
    @MaxLength(3)
    emails: string[];
  
    @IsArray()
    @Length(7, 15, { each: true }) // Assuming telephone numbers are between 7 and 15 digits
    @MaxLength(3)
    telephones: string[];
}