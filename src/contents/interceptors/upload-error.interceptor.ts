import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.error('Upload Error Interceptor caught error:', {
          message: error.message,
          stack: error.stack,
          code: error.code,
          errno: error.errno,
          syscall: error.syscall,
          path: error.path,
        });

        // Check if it's a file system related error
        if (error.code === 'ENOENT') {
          throw new BadRequestException(
            'Upload directory not found. Please contact administrator.',
          );
        }
        if (error.code === 'EACCES') {
          throw new BadRequestException(
            'Permission denied. Cannot write to upload directory.',
          );
        }
        if (error.code === 'EMFILE' || error.code === 'ENFILE') {
          throw new BadRequestException(
            'Too many open files. Please try again later.',
          );
        }
        if (error.code === 'ENOSPC') {
          throw new BadRequestException('No space left on device.');
        }

        // Re-throw the original error if it's not file system related
        throw error;
      }),
    );
  }
}
