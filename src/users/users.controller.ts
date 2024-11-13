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

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser(@Req() req: URequrst) {
    return this.userService.findOne(req.user.id);
  }

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
