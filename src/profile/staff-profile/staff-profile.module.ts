import { Module } from '@nestjs/common';
import { StaffProfileController } from './staff-profile.controller';
import { StaffProfileService } from './staff-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffProfile } from './entities/StaffProfile.entity';
import { Telephone } from './entities/telephone.entity';
import { Email } from './entities/email.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([StaffProfile, Telephone, Email]),
  ],
  controllers: [StaffProfileController],
  providers: [StaffProfileService],
  exports: [StaffProfileService],
})
export class StaffProfileModule {}
