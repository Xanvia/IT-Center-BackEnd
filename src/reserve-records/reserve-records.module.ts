import { Module } from '@nestjs/common';
import { ReserveRecordsService } from './reserve-records.service';
import { ReserveRecordsController } from './reserve-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReserveRecord } from './entities/reserve-record.entity';
import { UsersModule } from 'src/users/users.module';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReserveRecord]),
    UsersModule,
    ReservationsModule,
  ],
  controllers: [ReserveRecordsController],
  providers: [ReserveRecordsService],
  exports: [ReserveRecordsService],
})
export class ReserveRecordsModule {}
