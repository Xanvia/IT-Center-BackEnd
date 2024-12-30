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

@Injectable()
export class ReserveRecordsService {
  constructor(
    @InjectRepository(ReserveRecord)
    private reserveRecordRepository: Repository<ReserveRecord>,
    private reservationService: ReservationsService,
    private userService: UsersService,
  ) {}

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

      return await this.reserveRecordRepository.save(reserveRecord);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<ReserveRecord[]> {
    return this.reserveRecordRepository.find();
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

  async findOnebyUserId(id: string): Promise<ReserveRecord> {
    return this.reserveRecordRepository.findOne({ where: { user: { id } } });
  }

  async update(id: string, updateReserveRecordDto: UpdateReserveRecordDto) {
    const newRecord = await this.reserveRecordRepository.update(
      id,
      updateReserveRecordDto,
    );
    return newRecord;
  }

  async remove(id: string): Promise<void> {
    await this.reserveRecordRepository.delete(id);
  }
}
