import { Injectable } from '@nestjs/common';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';

@Injectable()
export class StudentProfileService {
  create(createStudentProfileDto: CreateStudentProfileDto) {
    return 'This action adds a new studentProfile';
  }

  findAll() {
    return `This action returns all studentProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentProfile`;
  }

  update(id: number, updateStudentProfileDto: UpdateStudentProfileDto) {
    return `This action updates a #${id} studentProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentProfile`;
  }
}
