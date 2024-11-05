import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservedDate } from './entities/reserved-date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ReservedDate])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
