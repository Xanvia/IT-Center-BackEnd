import { Module } from '@nestjs/common';
import { StaffProfileController } from './staffProfile.controller';
import { StaffProfileService } from './staffProfile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffProfile } from './entities/profile.entity';
import { Telephone } from './entities/telephone.entity';
import { Email } from './entities/email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffProfile, Telephone, Email])],
  controllers: [StaffProfileController],
  providers: [StaffProfileService],
})
export class StaffProfileModule {}