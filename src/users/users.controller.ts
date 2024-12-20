import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateStudentProfileDto } from 'src/profile/student-profile/dto/create-student-profile.dto';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth/jwt-auth.guard';
import { URequrst } from 'types/request.type';
import { RolesGuard } from 'src/auth/gaurds/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN, S_ADMIN, USER } from 'types/user.type';

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
}
