import { Module } from '@nestjs/common';
import { ReserveRecordsService } from './reserve-records.service';
import { ReserveRecordsController } from './reserve-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReserveRecord } from './entities/reserve-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReserveRecord])],
  controllers: [ReserveRecordsController],
  providers: [ReserveRecordsService],
})
export class ReserveRecordsModule {}
