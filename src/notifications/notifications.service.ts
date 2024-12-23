import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
    private userService: UsersService,
  ) {}

  async createForUser(createNotificationDto: CreateNotificationDto) {
    const { userId, sender, content } = createNotificationDto;
    try {
      const user = await this.userService.findOne(userId);
      const notification = this.notificationRepo.create({
        user,
        sender,
        content,
      });
      return await this.notificationRepo.save(notification);
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async createForAllUsers(createNotificationDto: CreateNotificationDto) {
    try {
      delete createNotificationDto.userId;
      const users = await this.userService.getUsers();

      users.forEach(async (user) => {
        const notification = this.notificationRepo.create({
          user,
          ...createNotificationDto,
        });
        await this.notificationRepo.save(notification);
      });
      return 'Notifications send for all users';
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async createForAllStudents(createNotificationDto: CreateNotificationDto) {
    try {
      delete createNotificationDto.userId;
      const users = await this.userService.getStudents();

      users.forEach(async (user) => {
        const notification = this.notificationRepo.create({
          user,
          ...createNotificationDto,
        });
        await this.notificationRepo.save(notification);
      });
      return 'Notifications send for all students';
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAllforUser(userId: string) {
    try {
      return await this.notificationRepo.find({
        where: { user: { id: userId } },
        order: { createdDate: 'DESC' },
      });
    } catch (error) {
      throw new BadRequestException('Failed to retrieve notifications');
    }
  }

  async findAllnewNotifications(userId: string) {
    try {
      return await this.notificationRepo.find({
        where: { user: { id: userId }, isRead: false },
        order: { createdDate: 'DESC' },
      });
    } catch (error) {
      throw new BadRequestException('Failed to retrieve new notifications');
    }
  }

  async setNotificationAsRead(notificationId: string) {
    try {
      return await this.notificationRepo.update(notificationId, {
        isRead: true,
      });
    } catch (error) {
      throw new BadRequestException('Failed to set notification as read');
    }
  }

  async setAllNotificationAsRead(userId: string) {
    try {
      const result = await this.notificationRepo.update(
        { user: { id: userId }, isRead: false },
        { isRead: true },
      );
      if (result.affected === 0) {
        throw new BadRequestException('No notifications found for this user');
      }
      return result;
    } catch (error) {
      throw new BadRequestException('Failed to update notifications');
    }
  }

  async deleteNotification(notificationId: string) {
    try {
      return await this.notificationRepo.delete(notificationId);
    } catch (error) {
      throw new BadRequestException('Failed to delete notification');
    }
  }

  async deleteAllNotification(userId: string) {
    try {
      return await this.notificationRepo.delete({ user: { id: userId } });
    } catch (error) {
      throw new BadRequestException('Failed to delete all notifications');
    }
  }
}
