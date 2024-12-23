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
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth/jwt-auth.guard';
import { URequrst } from 'types/request.type';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('user')
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createForUser(createNotificationDto);
  }

  @Post('all')
  createForAllUsers(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createForAllUsers(createNotificationDto);
  }

  @Post('allStudents')
  createForAllStudents(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createForAllStudents(
      createNotificationDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: URequrst) {
    return this.notificationsService.findAllforUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('read')
  findAllReads(@Req() req: URequrst) {
    return this.notificationsService.findAllnewNotifications(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  setRead(@Param('id') id: string) {
    return this.notificationsService.setNotificationAsRead(id);
  }

  @UseGuards(JwtAuthGuard)
  updateAllRead(@Req() req: URequrst) {
    return this.notificationsService.setAllNotificationAsRead(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.deleteNotification(id);
  }
}
