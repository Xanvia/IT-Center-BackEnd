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

  findAllforUser(userId: string) {
    return this.notificationRepo.find({
      where: { user: { id: userId } },
      order: { createdDate: 'DESC' },
    });
  }

  findAllnewNotifications(userId: string) {
    return this.notificationRepo.find({
      where: { user: { id: userId }, isRead: false },
      order: { createdDate: 'DESC' },
    });
  }

  setNotificationAsRead(notificationId: string) {
    return this.notificationRepo.update(notificationId, { isRead: true });
  }

  setAllNotificationAsRead(userId: string) {
    return this.notificationRepo.update(
      { user: { id: userId } },
      { isRead: true },
    );
  }

  deleteNotification(notificationId: string) {
    return this.notificationRepo.delete(notificationId);
  }

  deleteAllNotification(userId: string) {
    return this.notificationRepo.delete({ user: { id: userId } });
  }
}
