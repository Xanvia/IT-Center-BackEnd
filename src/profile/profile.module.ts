import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { StaffProfileService } from './staffProfile/staffProfile.service';
import { StaffProfileModule } from './staff-profile/staff-profile.module';

@Module({
  controllers: [ProfileController],
  providers: [StaffProfileService],
  imports: [StaffProfileModule],
})
export class ProfileModule {}
