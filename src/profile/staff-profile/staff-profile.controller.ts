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
import { Role } from 'enums/role.enum';
import { RolesGuard } from 'src/auth/gaurds/roles/roles.guard';
import { URequrst } from 'types/request.type';

@Controller('staff-profile')
export class StaffProfileController {
  constructor(private readonly staffProfileService: StaffProfileService) {}

  @Get() // http://localhost:30001/staff-profile
  findAll() {
    return this.staffProfileService.findAll();
  }

  @Get('requests') // http://localhost:3001/staff-profile/requests
  findAllRequests() {
    return this.staffProfileService.findAllRequests();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffProfileService.findOne(id);
  }

  @Roles([Role.STAFF])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getProfile(@Req() req: URequrst) {
    return this.staffProfileService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStaffProfileDto: CreateStaffProfileDto, @Req() req) {
    return this.staffProfileService.create(createStaffProfileDto, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStaffProfileDto: UpdateStaffProfileDto,
  ) {
    return this.staffProfileService.update(id, updateStaffProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffProfileService.remove(id);
  }
}
