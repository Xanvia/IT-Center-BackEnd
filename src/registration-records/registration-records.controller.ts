import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RegistrationRecordsService } from './registration-records.service';
import { CreateRegistrationRecordDto } from './dto/create-registration-record.dto';
import { UpdateRegistrationRecordDto } from './dto/update-registration-record.dto';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ADMIN, STUDENT } from 'types/user.type';
import { RolesGuard } from 'src/auth/gaurds/roles/roles.guard';
import { BulkUpdateDto } from './dto/bulk-update.dto';

@Controller('registration-records')
export class RegistrationRecordsController {
  constructor(
    private readonly registrationRecordsService: RegistrationRecordsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRegistrationRecordDto: CreateRegistrationRecordDto) {
    return this.registrationRecordsService.create(createRegistrationRecordDto);
  }

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.registrationRecordsService.findAll();
  }

  @Roles(STUDENT)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('user')
  findAllforUser(@Req() req) {
    return this.registrationRecordsService.findAllforUser(req.user.id);
  }

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('requests')
  findAllRequests() {
    return this.registrationRecordsService.getAllRecordsCourseWise();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationRecordsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistrationRecordDto: UpdateRegistrationRecordDto,
  ) {
    return this.registrationRecordsService.update(
      id,
      updateRegistrationRecordDto,
    );
  }

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('all/approve')
  approve(@Body() update: BulkUpdateDto) {
    return this.registrationRecordsService.updateAllRecordsByStatus(update);
  }

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('all/complete')
  setAllCompleted(@Body() update: BulkUpdateDto) {
    return this.registrationRecordsService.updateAllRecordsByStatusAndBatch(
      update,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationRecordsService.remove(id);
  }
}
