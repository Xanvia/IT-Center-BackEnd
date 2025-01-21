import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth/jwt-auth.guard';
import { URequrst } from 'types/request.type';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN } from 'types/user.type';
import { RolesGuard } from 'src/auth/gaurds/roles/roles.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('user')
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createForUser(createNotificationDto);
  }

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('all')
  createForAllUsers(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createForAllUsers(createNotificationDto);
  }

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('allStudents')
  createForAllStudents(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createForAllStudents(
      createNotificationDto,
    );
  }

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('allTeachers')
  createForAllTeachers(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createForAllTeachers(
      createNotificationDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: URequrst) {
    return this.notificationsService.findAllforUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('unread')
  findAllUnReads(@Req() req: URequrst) {
    return this.notificationsService.findAllnewNotifications(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  setRead(@Param('id') id: string) {
    return this.notificationsService.setNotificationAsRead(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('all')
  updateAllRead(@Req() req: URequrst) {
    return this.notificationsService.setAllNotificationAsRead(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.deleteNotification(id);
  }
}
