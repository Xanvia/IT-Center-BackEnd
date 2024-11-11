import { Module } from '@nestjs/common';
import { ReserveRecordsService } from './reserve-records.service';
import { ReserveRecordsController } from './reserve-records.controller';

@Module({
  controllers: [ReserveRecordsController],
  providers: [ReserveRecordsService],
})
export class ReserveRecordsModule {}
