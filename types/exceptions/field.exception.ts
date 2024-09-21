import { HttpException, HttpStatus } from '@nestjs/common';

export class FieldException extends HttpException {
  constructor(message: string, field: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        field,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
