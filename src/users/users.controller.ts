import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  // @Post(':id')
  // async usertoAdmin(@Param('id') userId: string) {
  //   return this.userService.updateUsertoAdmin(userId);
  // }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
