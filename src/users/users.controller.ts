import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateStudentProfileDto } from 'src/profile/student-profile/dto/create-student-profile.dto';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth/jwt-auth.guard';
import { URequrst } from 'types/request.type';
import { RolesGuard } from 'src/auth/gaurds/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN, S_ADMIN, USER } from 'types/user.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser(@Req() req: URequrst) {
    return this.userService.findOne(req.user.id);
  }

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/student')
  async getStudents() {
    return this.userService.getStudents();
  }

  @Roles(S_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/admin')
  async getAdmins() {
    return this.userService.getAdmins();
  }

  @Roles(USER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/convert/student')
  async usertoStudent(@Req() req, @Body() profile: CreateStudentProfileDto) {
    return this.userService.updateUsertoStudent(req.user.id, profile);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-img')
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
          cb(new BadRequestException('Only image file is allowed!'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (!file) {
      throw new BadRequestException('No files uploaded');
    }
    const res = await this.userService.updateProfileImage(
      req.user.id,
      req.user.role,
      file.path,
    );
    if (!res.affected) {
      throw new BadRequestException('Failed to upload image');
    }
    return {
      message: 'Files uploaded successfully',
      path: file.path,
    };
  }
}
