import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { StudentProfileService } from './student-profile.service';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('student-profile')
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

  @Get()
  findAll() {
    return this.studentProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentProfileService.findOne(id);
  }

  @Post()
  create(@Req() req, @Body() createStudentProfileDto: CreateStudentProfileDto) {
    return this.studentProfileService.create(createStudentProfileDto, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentProfileDto: UpdateStudentProfileDto,
  ) {
    return this.studentProfileService.update(id, updateStudentProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentProfileService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('user', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // e.g., image-123456789.png
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new BadRequestException('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadFiles(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No files uploaded');
    }

    return {
      message: 'Files uploaded successfully',
      path: file.path,
    };
  }
}
