import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StaffProfileService } from './staff-profile.service';
import { CreateStaffProfileDto } from './dto/create-staff-profile.dto';
import { UpdateStaffProfileDto } from './dto/update-staff-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('staff-profile')
export class StaffProfileController {
  constructor(private readonly staffProfileService: StaffProfileService) {}

  @Get() // http://localhost:30001/staff-profile
  findAll() {
    return this.staffProfileService.findAll();
  }

  @Get('requests') // http://localhost:30001/staff-profile/requests
  findAllRequests() {
    return this.staffProfileService.findAllRequests();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffProfileService.findOne(id);
  }

  @Post()
  create(@Body() createStaffProfileDto: CreateStaffProfileDto) {
    return this.staffProfileService.create(createStaffProfileDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStaffProfileDto: UpdateStaffProfileDto,
  ) {
    return this.staffProfileService.update(id, updateStaffProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffProfileService.remove(id);
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
