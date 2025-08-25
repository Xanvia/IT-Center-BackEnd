import { IsString, MinLength, IsNotEmpty, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
    {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
  )
  newPassword: string;
}
