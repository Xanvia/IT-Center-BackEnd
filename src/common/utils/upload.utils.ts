import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';

export interface UploadConfig {
  directory: string;
  fieldName: string;
  maxFiles?: number;
  maxFileSize?: number;
  allowedMimeTypes?: RegExp;
}

export class UploadUtils {
  static createUploadStorage(config: UploadConfig) {
    return {
      destination: (req: any, file: any, cb: any) => {
        // Determine the correct uploads path
        const uploadsDir = path.join(
          process.cwd(),
          'uploads',
          config.directory,
        );

        // Ensure directory exists
        if (!fs.existsSync(uploadsDir)) {
          try {
            fs.mkdirSync(uploadsDir, { recursive: true });
            console.log(`Created upload directory: ${uploadsDir}`);
          } catch (error) {
            console.error(
              `Failed to create upload directory ${uploadsDir}:`,
              error,
            );
            return cb(
              new BadRequestException(
                `Failed to create upload directory: ${error.message}`,
              ),
              null,
            );
          }
        }

        cb(null, uploadsDir);
      },
      filename: (req: any, file: any, cb: any) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${config.fieldName}-${uniqueSuffix}${ext}`);
      },
    };
  }

  static createFileFilter(allowedMimeTypes: RegExp = /\/(jpg|jpeg|png|gif)$/) {
    return (req: any, file: any, cb: any) => {
      if (!file.mimetype.match(allowedMimeTypes)) {
        cb(new BadRequestException('Only image files are allowed!'), false);
      } else {
        cb(null, true);
      }
    };
  }

  /**
   * Converts absolute file path to relative URL path starting with "uploads/"
   * @param absolutePath - The absolute file system path
   * @returns Relative URL path starting with "uploads/"
   */
  static getRelativeUploadPath(absolutePath: string): string {
    const uploadsIndex = absolutePath.indexOf('uploads');
    if (uploadsIndex === -1) {
      throw new BadRequestException('Invalid upload path');
    }
    return absolutePath.substring(uploadsIndex);
  }

  static handleUploadError(error: any, context: string): never {
    console.error(`Upload error in ${context}:`, {
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
        `Upload directory not found for ${context}. Please contact administrator.`,
      );
    }
    if (error.code === 'EACCES') {
      throw new BadRequestException(
        `Permission denied for ${context}. Cannot write to upload directory.`,
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
  }
}
