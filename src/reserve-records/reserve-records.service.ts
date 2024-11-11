import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, UpdateResult } from 'typeorm';
import { CreateReserveRecordDto } from './dto/create-reserve-record.dto';
import { UpdateReserveRecordDto } from './dto/update-reserve-record.dto';
import { ReserveRecord } from './entities/reserve-record.entity';

@Injectable()
export class ReserveRecordsService {
  constructor(
    @InjectRepository(ReserveRecord)
    private reserveRecordRepository: Repository<ReserveRecord>,
  ) {}

  async create(
    createReserveRecordDto: CreateReserveRecordDto,
  ): Promise<ReserveRecord> {
    const reserveRecord = this.reserveRecordRepository.create(
      createReserveRecordDto,
    );
    return this.reserveRecordRepository.save(reserveRecord);
  }

  async findAll(): Promise<ReserveRecord[]> {
    return this.reserveRecordRepository.find();
  }

  // get all pending records
  async findAllPending(): Promise<ReserveRecord[]> {
    return this.reserveRecordRepository.find({ where: { status: 'Pending' } });
  }

  // get all records that not ended
  async findAllNotEnded(): Promise<ReserveRecord[]> {
    return this.reserveRecordRepository.find({
      where: { status: Not('Done') },
    });
  }

  async findOne(id: string): Promise<ReserveRecord> {
    return this.reserveRecordRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateReserveRecordDto: UpdateReserveRecordDto,
  ): Promise<UpdateResult> {
    if (this.reserveRecordRepository.findOne({ where: { id } })) {
      throw new Error('Record not found');
    }

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
