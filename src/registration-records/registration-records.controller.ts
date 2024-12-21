import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistrationRecordsService } from './registration-records.service';
import { CreateRegistrationRecordDto } from './dto/create-registration-record.dto';
import { UpdateRegistrationRecordDto } from './dto/update-registration-record.dto';

@Controller('registration-records')
export class RegistrationRecordsController {
  constructor(private readonly registrationRecordsService: RegistrationRecordsService) {}

  @Post()
  create(@Body() createRegistrationRecordDto: CreateRegistrationRecordDto) {
    return this.registrationRecordsService.create(createRegistrationRecordDto);
  }

  @Get()
  findAll() {
    return this.registrationRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationRecordDto: UpdateRegistrationRecordDto) {
    return this.registrationRecordsService.update(+id, updateRegistrationRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationRecordsService.remove(+id);
  }
}
