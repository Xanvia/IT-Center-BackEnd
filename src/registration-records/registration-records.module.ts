import { Module } from '@nestjs/common';
import { RegistrationRecordsService } from './registration-records.service';
import { RegistrationRecordsController } from './registration-records.controller';

@Module({
  controllers: [RegistrationRecordsController],
  providers: [RegistrationRecordsService],
})
export class RegistrationRecordsModule {}
