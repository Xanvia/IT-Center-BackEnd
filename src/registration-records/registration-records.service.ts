import { Injectable } from '@nestjs/common';
import { CreateRegistrationRecordDto } from './dto/create-registration-record.dto';
import { UpdateRegistrationRecordDto } from './dto/update-registration-record.dto';

@Injectable()
export class RegistrationRecordsService {
  create(createRegistrationRecordDto: CreateRegistrationRecordDto) {
    return 'This action adds a new registrationRecord';
  }

  findAll() {
    return `This action returns all registrationRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registrationRecord`;
  }

  update(id: number, updateRegistrationRecordDto: UpdateRegistrationRecordDto) {
    return `This action updates a #${id} registrationRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} registrationRecord`;
  }
}
