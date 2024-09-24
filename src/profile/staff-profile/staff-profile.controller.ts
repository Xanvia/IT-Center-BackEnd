import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StaffProfileService } from './staff-profile.service';
import { CreateStaffProfileDto } from './dto/create-staff-profile.dto';
import { UpdateStaffProfileDto } from './dto/update-staff-profile.dto';
  
@Controller('staff-profile')
export class StaffProfileController {
  constructor(private readonly staffProfileService: StaffProfileService) {}
  
  @Get()
  findAll() {
    return this.staffProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffProfileService.findOne(id);
  }

  @Post()
  create(@Body() createStaffProfileDto: CreateStaffProfileDto) {
    return this.staffProfileService.create(createStaffProfileDto);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffProfileDto: UpdateStaffProfileDto) {
    return this.staffProfileService.update(id, updateStaffProfileDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffProfileService.remove(id);
  }
}