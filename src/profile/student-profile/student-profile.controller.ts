import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StudentProfileService } from './student-profile.service';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
// import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth/jwt-auth.guard';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { Role } from 'enums/role.enum';
// import { RolesGuard } from 'src/auth/gaurds/roles/roles.guard';
// import { URequrst } from 'types/request.type';

@Controller('student-profile')
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

  @Get('all')
  findAll() {
    return this.studentProfileService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.studentProfileService.findOne(id);
  }

  @Post()
  create(@Body() createStudentProfileDto: CreateStudentProfileDto) {
    return this.studentProfileService.create(createStudentProfileDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentProfileDto: UpdateStudentProfileDto,
  ) {
    return this.studentProfileService.update(id, updateStudentProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentProfileService.remove(id);
  }
}
