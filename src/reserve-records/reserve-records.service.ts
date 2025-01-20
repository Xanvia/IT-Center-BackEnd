import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateReserveRecordDto } from './dto/create-reserve-record.dto';
import { UpdateReserveRecordDto } from './dto/update-reserve-record.dto';
import { ReserveRecord } from './entities/reserve-record.entity';
import { ReservationStatus } from 'enums/reservation.enum';
import { ReservationsService } from 'src/reservations/reservations.service';
import { UsersService } from 'src/users/users.service';
import { Cron } from '@nestjs/schedule';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Sender } from 'enums/sender.enum';
import { MailService } from 'src/emails/mail.service';

@Injectable()
export class ReserveRecordsService {
  constructor(
    @InjectRepository(ReserveRecord)
    private reserveRecordRepository: Repository<ReserveRecord>,
    private reservationService: ReservationsService,
    private userService: UsersService,
    private notificationService: NotificationsService,
    private emailServices: MailService,
  ) {}

  @Cron('0 17 * * *') // every day at 5 PM
  handleCron() {
    console.log('Updating records...');

    const update = async () => {
      const records = await this.reserveRecordRepository.find({
        where: { status: Not(ReservationStatus.DONE) },
      });

      records.forEach(async (record) => {
        if (new Date(record.endingDate) < new Date()) {
          record.status = ReservationStatus.DONE;
          await this.reserveRecordRepository.save(record);
        }
      });
    };
    update();
  }

  async create(createReserveRecordDto: CreateReserveRecordDto, userId: string) {
    try {
      const { reservationId, ...rest } = createReserveRecordDto;
      const record = await this.reservationService.findOne(reservationId);
      if (!record) {
        throw new NotFoundException('Reservation not found');
      }

      const reserveRecord = this.reserveRecordRepository.create({
        ...rest,
        reservation: record,
        user: await this.userService.findOne(userId),
      });

      await this.reserveRecordRepository.save(reserveRecord);

      await this.notificationService.createForUser({
        userId: userId,
        sender: Sender.SYSTEM,
        subject: `Reservation request for ${record.name}`,
        content: `Your reservation request for ${record.name} on ${reserveRecord.startingDate.split('05:30')} has been created successfully!`,
      });

      await this.emailServices.createReservationRecord(reserveRecord);
      return 'Record created successfully';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // find all with user detials
  async findAll(): Promise<ReserveRecord[]> {
    return this.reserveRecordRepository.find({
      relations: ['user', 'reservation'],
      select: {
        user: {
          id: true,
          email: true,
          name: true,
          image: true,
        },
        reservation: {
          name: true,
        },
      },
    });
  }

  // get all pending records
  async findAllPending(): Promise<ReserveRecord[]> {
    return this.reserveRecordRepository.find({
      where: { status: ReservationStatus.PENDING },
    });
  }

  // get all records that not ended
  async findAllNotEnded(): Promise<ReserveRecord[]> {
    return this.reserveRecordRepository.find({
      where: { status: Not(ReservationStatus.DONE) },
    });
  }

  async findOnebyUserId(id: string): Promise<ReserveRecord[]> {
    return this.reserveRecordRepository.find({
      where: { user: { id } },
      relations: ['reservation'],
      select: {
        reservation: {
          name: true,
        },
      },
    });
  }

  async findByReservationId(id: string): Promise<ReserveRecord[]> {
    return this.reserveRecordRepository.find({
      where: { reservation: { id } },
    });
  }

  async update(id: string, updateReserveRecordDto: UpdateReserveRecordDto) {
    const newRecord = await this.reserveRecordRepository.update(
      id,
      updateReserveRecordDto,
    );
    try {
      const record = await this.reserveRecordRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      await this.notificationService.createForUser({
        userId: record.user.id,
        sender: Sender.SYSTEM,
        subject: `Reservation Event: ${record.eventName}`,
        content: `Your reservation request for ${record.eventName} on ${record.startingDate} has been updated.`,
      });
    } catch (error) {
      console.log(error);
    }

    return newRecord;
  }

  async remove(id: string): Promise<void> {
    await this.reserveRecordRepository.delete(id);
  }
}
