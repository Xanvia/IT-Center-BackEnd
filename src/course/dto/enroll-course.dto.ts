import { IsUUID, IsNotEmpty } from 'class-validator';

export class EnrollCourseDto {
  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
