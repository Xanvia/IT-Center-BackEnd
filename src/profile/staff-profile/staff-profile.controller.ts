import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StaffProfileService } from './staff-profile.service';
import { CreateStaffProfileDto } from './dto/create-staff-profile.dto';
import { UpdateStaffProfileDto } from './dto/update-staff-profile.dto';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/gaurds/roles/roles.guard';
import { ADMIN, STAFF, USER } from 'types/user.type';

@Controller('staff-profile')
export class StaffProfileController {
  constructor(private readonly staffProfileService: StaffProfileService) {}

  // create staff request by user
  @Roles(USER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStaffProfileDto: CreateStaffProfileDto, @Req() req) {
    return this.staffProfileService.create(createStaffProfileDto, req.user.id);
  }

  // get all staff profiles including requests (NOT NEEDED)
  @Get()
  findAll() {
    return this.staffProfileService.findAll();
  }

  // get all staff profiles
  @Get('profile')
  findAllProfiles() {
    return this.staffProfileService.findAllProfiles();
  }

  // get All requests by admin
  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('requests')
  findAllRequests() {
    return this.staffProfileService.findAllRequests();
  }

  // find by id  (NOT NEEDED)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffProfileService.findOne(id);
  }

  // update profile data
  @Patch(':id')
  @Roles(STAFF)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateStaffProfileDto: UpdateStaffProfileDto,
  ) {
    return this.staffProfileService.update(id, updateStaffProfileDto);
  }

  // delete profile (delete request) by admin
  @Delete(':id')
  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.staffProfileService.remove(id);
  }
}
