import { Injectable } from '@nestjs/common';
import { CreateReserveRecordDto } from './dto/create-reserve-record.dto';
import { UpdateReserveRecordDto } from './dto/update-reserve-record.dto';

@Injectable()
export class ReserveRecordsService {
  create(createReserveRecordDto: CreateReserveRecordDto) {
    return 'This action adds a new reserveRecord';
  }

  findAll() {
    return `This action returns all reserveRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reserveRecord`;
  }

  update(id: number, updateReserveRecordDto: UpdateReserveRecordDto) {
    return `This action updates a #${id} reserveRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} reserveRecord`;
  }
}
