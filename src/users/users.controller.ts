import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { ADMIN, S_ADMIN, STAFF, STUDENT, USER } from 'types/user.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  // get all users by admin (NOT NEEDED)
  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUsers() {
    return this.userService.getUsers();
  }

  // get own details by user (NOT NEEDED)
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser(@Req() req: URequrst) {
    return this.userService.findOne(req.user.id);
  }

  // get all students by admin
  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/student')
  async getStudents() {
    return this.userService.getStudents();
  }

  // get own student details by student
  @Roles(STUDENT)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/student/me')
  async getMyStudentInfo(@Req() req: URequrst) {
    return this.userService.getMyStudentInfo(req.user.id);
  }

  // get student details by admin
  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/student/:id')
  async getStudentInfo(@Param('id') userId: string) {
    return this.userService.getMyStudentInfo(userId);
  }

  // get all staff members including admins

  @Get('/staff')
  async getStaffs() {
    return this.userService.getStaff();
  }

  // get own student details by staff
  @Roles(STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/staff/me')
  async getMyStaffInfo(@Req() req: URequrst) {
    return this.userService.getMyStaffInfo(req.user.id);
  }

  // get all admins by super admin  (NOT NEEDED)
  @Roles(S_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/admin')
  async getAdmins() {
    return this.userService.getAdmins();
  }

  // convert user to student by user
  @Roles(USER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/convert/student')
  async usertoStudent(@Req() req, @Body() profile: CreateStudentProfileDto) {
    return this.userService.updateUsertoStudent(req.user.id, profile);
  }

  // convert user to staff by admin
  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/convert/staff')
  async usertoStaff(@Body() req) {
    return this.userService.updateUsertoStaff(req.requestBy);
  }

  // convert staff to admin by super admin
  @Roles(S_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/convert/admin')
  async stafftoAdmin(@Body() req) {
    return this.userService.updateStafftoAdmin(req.requestId);
  }

  // convert admin to super admin by super admin
  @Roles(S_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/convert/super-admin')
  async admintoSuperAdmin(@Body() req) {
    return this.userService.updateAdmintoSuperAdmin(req.requestId);
  }

  // demote staff to user by super admin
  @Roles(S_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/demote/staff')
  async adminToStaff(@Body() req) {
    return this.userService.updateAdmintoStaff(req.requestId);
  }

  // upload user image by user
  @UseGuards(JwtAuthGuard)
  @Post('upload-img')
  @UseInterceptors(
    FileInterceptor('user', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads/users');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // e.g., image-12346789.png
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

  // change password by user
  @UseGuards(JwtAuthGuard)
  @Put('/password')
  async changePassword(@Req() req, @Body() body) {
    return this.userService.changePassword(req.user.id, body.current, body.new);
  }

  // change account details by user
  @UseGuards(JwtAuthGuard)
  @Put('/')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.id, updateUserDto);
  }

  // delete account by user
  @UseGuards(JwtAuthGuard)
  @Delete('/')
  async deleteUser(@Req() req: URequrst) {
    return this.userService.deleteUser(req.user.id);
  }

  // delete account by admin
  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUserByAdmin(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  // get stats by admin
  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/stats')
  async getStats() {
    return this.userService.getStatistics();
  }
}
