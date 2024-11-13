import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateStudentProfileDto } from 'src/profile/student-profile/dto/create-student-profile.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('/convert/student')
  async usertoStudent(@Req() req, @Body() profile: CreateStudentProfileDto) {
    return this.userService.updateUsertoStudent(req.user.id, profile);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
