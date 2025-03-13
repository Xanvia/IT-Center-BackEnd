import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { ReserveRecordsModule } from 'src/reserve-records/reserve-records.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), ReserveRecordsModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
