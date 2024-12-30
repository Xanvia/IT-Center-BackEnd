import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, UpdateResult } from 'typeorm';
import { CreateReserveRecordDto } from './dto/create-reserve-record.dto';
import { UpdateReserveRecordDto } from './dto/update-reserve-record.dto';
import { ReserveRecord } from './entities/reserve-record.entity';
import { Status } from 'enums/registration.enum';
import { ReservationStatus } from 'enums/reservation.enum';

@Injectable()
export class ReserveRecordsService {
  constructor(
    @InjectRepository(ReserveRecord)
    private reserveRecordRepository: Repository<ReserveRecord>,
  ) {}

  async create(createReserveRecordDto: CreateReserveRecordDto, userId: string) {
    // try {
    //   const { reservationId, ...rest } = createReserveRecordDto;
    //   const record = await this.reserveRecordRepository.findOne({
    //     where: { reservationId },
    //   });
    // } catch (error) {
    // }
    // const reserveRecord = this.reserveRecordRepository.create(
    //   createReserveRecordDto,
    // );
    // return this.reserveRecordRepository.save(reserveRecord);
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

  async findOne(id: string): Promise<ReserveRecord> {
    return this.reserveRecordRepository.findOne({ where: { id } });
  }

  async update(id: string, updateReserveRecordDto: UpdateReserveRecordDto) {
    const record = await this.reserveRecordRepository.findOne({
      where: { id },
    });
    if (!record) {
      throw new Error('Record not found');
    }

    // const newRecord = await this.reserveRecordRepository.update(
    //   id,
    //   updateReserveRecordDto,
    // );
    // return newRecord;
  }

  async remove(id: string): Promise<void> {
    await this.reserveRecordRepository.delete(id);
  }
}
