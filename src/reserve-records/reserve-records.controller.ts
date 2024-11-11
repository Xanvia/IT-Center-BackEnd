import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReserveRecordsService } from './reserve-records.service';
import { CreateReserveRecordDto } from './dto/create-reserve-record.dto';
import { UpdateReserveRecordDto } from './dto/update-reserve-record.dto';

@Controller('reserve-records')
export class ReserveRecordsController {
  constructor(private readonly reserveRecordsService: ReserveRecordsService) {}

  @Post()
  create(@Body() createReserveRecordDto: CreateReserveRecordDto) {
    return this.reserveRecordsService.create(createReserveRecordDto);
  }

  @Get()
  findAll() {
    return this.reserveRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReserveRecordDto: UpdateReserveRecordDto) {
    return this.reserveRecordsService.update(+id, updateReserveRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveRecordsService.remove(+id);
  }
}
