import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { Admin } from './entities/admin.entity';
import { Staff } from './entities/staff.entity';
import { Student } from './entities/student.entity';
import { SuperAdmin } from './entities/superAdmin.entity';
import { StudentProfileModule } from 'src/profile/student-profile/student-profile.module';
import { StaffProfileModule } from 'src/profile/staff-profile/staff-profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, Staff, Student, SuperAdmin]),
    StudentProfileModule,
    StaffProfileModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
